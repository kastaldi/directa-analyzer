import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, FileText, Download, Upload } from 'lucide-react';
import { clsx } from 'clsx';

function AccordionItem({ title, children, isOpen, onClick }) {
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
            <button
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex items-center justify-between transition-colors"
                onClick={onClick}
            >
                <span className="font-medium text-gray-900">{title}</span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
            </button>
            <div
                className={clsx(
                    "bg-gray-50 transition-all duration-300 ease-in-out overflow-hidden",
                    isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="p-6 text-gray-600 text-sm leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function Instructions() {
    const [openSection, setOpenSection] = useState('guide');

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="max-w-3xl mx-auto mt-12">
            <div className="flex items-center space-x-2 mb-6">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Help & Documentation</h2>
            </div>

            <AccordionItem
                title="📌 Quick Start Guide"
                isOpen={openSection === 'guide'}
                onClick={() => toggleSection('guide')}
            >
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">What is this tool?</h3>
                        <p>
                            This tool visualizes the performance of your Directa investments over time.
                            Directa's default "Patrimony" chart includes deposits and withdrawals, making it difficult to see actual investment performance.
                            This analyzer filters out those movements to show your true Gain/Loss.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">How to use it?</h3>
                        <ol className="list-decimal list-inside space-y-3 ml-1">
                            <li className="pl-2">
                                <span className="font-medium">Log in to Directa</span> (Libera platform).
                            </li>
                            <li className="pl-2">
                                Navigate to: <span className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-800 text-xs font-mono">Account &rarr; Patrimony &rarr; History</span>.
                            </li>
                            <li className="pl-2">
                                Select your desired date range (max 3 years).
                            </li>
                            <li className="pl-2">
                                Click the <Download className="w-4 h-4 inline mx-1" /> icon above the chart to download the <strong>CSV</strong> file.
                            </li>
                            <li className="pl-2">
                                Upload that file here using the box above.
                            </li>
                        </ol>
                    </div>
                </div>
            </AccordionItem>

            <AccordionItem
                title="❓ Frequently Asked Questions"
                isOpen={openSection === 'faq'}
                onClick={() => toggleSection('faq')}
            >
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-900">Is my data safe?</h4>
                        <p className="mt-1">
                            Yes. All analysis happens <strong>locally in your browser</strong>.
                            Your financial data is never sent to any server.
                            The code is open source and available on GitHub.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">Why doesn't the "Total Gain/Loss" match Directa?</h4>
                        <p className="mt-1">
                            This tool includes dividends and coupons in the total gain calculation, whereas Directa's simple view might not include them in the same way depending on the view.
                        </p>
                    </div>
                </div>
            </AccordionItem>
        </div>
    );
}