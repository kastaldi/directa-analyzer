import React, { useRef } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

export function FileUpload({ onFileUpload, isLoading, error }) {
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
        <div className="w-full max-w-2xl mx-auto mb-8">
            <div
                className={clsx(
                    "relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 ease-in-out text-center cursor-pointer group",
                    isLoading ? "bg-gray-50 border-gray-300 cursor-wait" : "bg-white border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md"
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
                
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className={clsx(
                        "p-4 rounded-full transition-colors duration-200",
                        isLoading ? "bg-gray-100" : "bg-blue-100 group-hover:bg-blue-200"
                    )}>
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        ) : (
                            <Upload className="w-8 h-8 text-blue-600" />
                        )}
                    </div>
                    
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {isLoading ? "Processing..." : "Upload your CSV file"}
                        </h3>
                        <p className="text-sm text-gray-500">
                            Drag and drop or click to browse
                        </p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-medium text-red-800">Error processing file</h4>
                        <p className="text-sm text-red-600 mt-1">{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
}