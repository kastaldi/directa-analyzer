export function parseCSV(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const result = parseCSVContent(event.target.result);
            resolve(result);
        };
        reader.readAsText(file);
    });
}

export function parseCSVContent(csvText) {
    const lines = csvText.split('\n');
    const headerIndex = findHeaderIndex(lines);

    if (headerIndex === -1) {
        return {
            portfolioData: [],
            movimentiData: [],
            warnings: ["Header non trovato"],
            error: "Formato CSV non valido: impossibile trovare l'header"
        };
    }

    const portfolioData = [];
    const movimentiData = [];
    const warnings = [];

    lines.slice(headerIndex + 1).forEach((line, index) => {
        if (!line.trim()) return; // Salta righe vuote

        const columns = line.split(',');

        try {
            // Parsing dati portafoglio (prima parte della riga)
            if (columns[0]?.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                portfolioData.push({
                    date: columns[0].trim(),
                    liquidita: parseFloat(columns[1]),
                    finanziamento: parseFloat(columns[2]),
                    patrimonio: parseFloat(columns[6])
                });
            }

            // Parsing movimenti (seconda parte della riga)
            if (columns[8]?.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                movimentiData.push({
                    date: columns[8].trim(),
                    value: parseFloat(columns[10])
                });
            }
        } catch (error) {
            warnings.push(`Errore alla riga ${index + headerIndex + 2}: ${error.message}`);
        }
    });

    return {
        portfolioData: portfolioData.filter(Boolean),
        movimentiData: movimentiData.filter(Boolean),
        warnings,
        headerIndex
    };
}

function findHeaderIndex(lines) {
    const headerPattern = /^Data,Liquidità,Finanaziamento long,Garanzia short,Portafoglio,Margini compnensati,Patrimonio/i;

    // Cerca l'header in tutte le righe
    for (let i = 0; i < lines.length; i++) {
        if (headerPattern.test(lines[i].trim())) {
            return i;
        }
    }

    return -1; // Header non trovato
}