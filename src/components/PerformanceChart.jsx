import React, { useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Maximize2, RotateCcw } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    zoomPlugin
);

export function PerformanceChart({ dailyGains }) {
    const chartRef = useRef(null);

    const handleResetZoom = () => {
        if (chartRef.current) {
            chartRef.current.resetZoom();
        }
    };

    const data = {
        labels: dailyGains.map(day => day.date),
        datasets: [
            {
                label: 'Cumulative Gain/Loss',
                data: dailyGains.map(day => day.cumulativeGainLoss),
                borderColor: 'rgb(37, 99, 235)', // blue-600
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 2,
                tension: 0.1,
                fill: true,
                yAxisID: 'y',
                pointRadius: 0,
                pointHoverRadius: 4,
            },
            {
                label: 'Cumulative Investments',
                data: dailyGains.map(day => day.cumulativeInvestment),
                borderColor: 'rgb(220, 38, 38)', // red-600
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0.1,
                yAxisID: 'y1',
                pointRadius: 0,
                pointHoverRadius: 4,
            },
            {
                label: 'TWRR (%)',
                data: dailyGains.map(day => day.twrr * 100),
                borderColor: 'rgb(147, 51, 234)', // purple-600
                borderWidth: 2,
                tension: 0.1,
                yAxisID: 'y2',
                pointRadius: 0,
                pointHoverRadius: 4,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    padding: 20,
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12
                    }
                }
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy'
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'xy',
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1f2937',
                bodyColor: '#4b5563',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                boxPadding: 4,
                usePointStyle: true,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            if (context.dataset.yAxisID === 'y2') {
                                label += context.parsed.y.toFixed(2) + '%';
                            } else {
                                label += new Intl.NumberFormat('it-IT', {
                                    style: 'currency',
                                    currency: 'EUR'
                                }).format(context.parsed.y);
                            }
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    maxTicksLimit: 8,
                    maxRotation: 0
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Gain/Loss (€)',
                    color: 'rgb(37, 99, 235)',
                    font: { weight: 'bold' }
                },
                grid: {
                    color: '#f3f4f6'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Investments (€)',
                    color: 'rgb(220, 38, 38)',
                    font: { weight: 'bold' }
                },
                grid: {
                    drawOnChartArea: false
                }
            },
            y2: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'TWRR (%)',
                    color: 'rgb(147, 51, 234)',
                    font: { weight: 'bold' }
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Performance Analysis</h3>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleResetZoom}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Reset Zoom"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="h-[500px] w-full">
                <Line ref={chartRef} data={data} options={options} />
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">
                Use mouse wheel to zoom, drag to pan
            </p>
        </div>
    );
}