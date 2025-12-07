import React, { useRef } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

export function FileUpload({ onFileUpload, isLoading, error, hasFile }) {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onFileUpload(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith('.csv')) {
            onFileUpload(file);
        }
    };

    return (
        <div className={clsx("w-full mx-auto mb-8 transition-all duration-500", hasFile ? "max-w-lg" : "max-w-2xl")}>
            <div
                className={clsx(
                    "relative border-2 border-dashed rounded-2xl transition-all duration-200 ease-in-out text-center cursor-pointer group",
                    isLoading ? "bg-gray-50 border-gray-300 cursor-wait p-8" :
                    hasFile ? "bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 p-4" :
                    "bg-white border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md p-8"
                )}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => !isLoading && fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".csv"
                    onChange={handleFileChange}
                    disabled={isLoading}
                />
                
                <div className={clsx("flex items-center justify-center transition-all duration-200", hasFile ? "flex-row space-x-4" : "flex-col space-y-4")}>
                    <div className={clsx(
                        "rounded-full transition-colors duration-200",
                        isLoading ? "bg-gray-100" : "bg-blue-100 group-hover:bg-blue-200",
                        hasFile ? "p-2" : "p-4"
                    )}>
                        {isLoading ? (
                            <div className={clsx("animate-spin rounded-full border-b-2 border-blue-600", hasFile ? "h-4 w-4" : "h-8 w-8")}></div>
                        ) : (
                            <Upload className={clsx("text-blue-600", hasFile ? "w-4 h-4" : "w-8 h-8")} />
                        )}
                    </div>
                    
                    <div className={clsx("space-y-1", hasFile && "text-left")}>
                        <h3 className={clsx("font-semibold text-gray-900", hasFile ? "text-sm" : "text-lg")}>
                            {isLoading ? "Elaborazione..." : hasFile ? "Carica un altro file CSV" : "Carica il tuo file CSV"}
                        </h3>
                        {!hasFile && (
                            <p className="text-sm text-gray-500">
                                Trascina e rilascia o clicca per sfogliare
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-medium text-red-800">Errore durante l'elaborazione del file</h4>
                        <p className="text-sm text-red-600 mt-1">{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
}