## Directa Portfolio Analyzer

### Cos'e' questo strumento?
Attraverso questo strumento potrai visualizzare l'andamento dei tuoi investimenti fatti su Directa nel corso del tempo.

Purtroppo il grafico fornito da Directa nella sezione "Patimonio" include anche i bonifici in entrata e uscita, il che rende difficile capire il Gain/Loss effettivo dei propri investimeti

Questo strumento ti permettera' di visualizzare quel grafico al netto dei movimenti


### Come eseguire il programma
Il progetto è sviluppato utilizzando tecnologie web standard (HTML, CSS, JS) e non richiede installazioni server-side.
1. Scarica o clona la repository.
2. Apri il file `index.html` direttamente con il tuo browser web.
3. Segui le istruzioni a schermo per caricare il file CSV di Directa.

**Nota sulla Privacy**: L'elaborazione dei dati avviene interamente nel tuo browser (client-side). Nessun dato finanziario viene inviato a server esterni.

### Dettagli sui calcoli
Per garantire la massima trasparenza, ecco come vengono calcolate le metriche principali:

* **Gain/Loss Totale**: Calcolato isolando la performance di mercato dai flussi di cassa. Per ogni giorno, calcoliamo la variazione del patrimonio e sottraiamo i bonifici netti (in entrata o uscita). La somma di questi valori giornalieri fornisce il Gain/Loss effettivo.
* **Gain/Loss %**: Calcolato rapportando il Gain/Loss Totale al **Capitale Medio Ponderato**. Utilizziamo un approccio simile al *Modified Dietz*, che pondera ogni versamento o prelievo in base al tempo in cui il capitale è rimasto investito nel periodo. Questo offre una misura più accurata del rendimento rispetto al semplice rapporto sul capitale iniziale.
* **Totale Movimenti**: La somma netta di tutti i depositi e prelievi effettuati nel periodo.
* **Patrimonio Iniziale/Finale**: Il valore del patrimonio al primo e all'ultimo giorno del periodo selezionato.
* **Max Gain/Loss**: Il valore massimo e minimo di profitto/perdita registrato in una singola giornata.


## Per i dev

Good old html + js + css.
Per il momento un qualsiasi framework mi sembra un overkill, ma se qualcuno vuole contribuire con un refactor in React o simili, ben venga.