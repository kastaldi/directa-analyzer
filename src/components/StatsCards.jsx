import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Percent, Activity, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency, formatPercentage, findMaxGainAndLoss } from '../utils/calculations';

function StatCard({ title, value, icon: Icon, trend, subValue, color = "blue" }) {
    const colorClasses = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        red: "bg-red-50 text-red-600",
        purple: "bg-purple-50 text-purple-600",
        orange: "bg-orange-50 text-orange-600",
        teal: "bg-teal-50 text-teal-600"
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
                    {Icon && <Icon className="w-6 h-6" />}
                </div>
                {trend && (
                    <div className={`flex items-center space-x-1 text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        <span>{Math.abs(trend)}%</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                {subValue && (
                    <p className="text-sm text-gray-400 mt-1">{subValue}</p>
                )}
            </div>
        </div>
    );
}

export function StatsCards({ stats }) {
    const { maxGain, maxLoss } = findMaxGainAndLoss(stats.dailyGains);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Primary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <StatCard
                    title="Total Gain/Loss"
                    value={formatCurrency(stats.totalGainLoss)}
                    icon={stats.totalGainLoss >= 0 ? TrendingUp : TrendingDown}
                    color={stats.totalGainLoss >= 0 ? "green" : "red"}
                />
                <StatCard
                    title="Gain/Loss %"
                    value={formatPercentage(stats.totalGainLossPercentage)}
                    icon={Percent}
                    color="blue"
                />
                <StatCard
                    title="TWRR"
                    value={formatPercentage(stats.totalTwrr)}
                    icon={Activity}
                    color="purple"
                />
                <StatCard
                    title="Total Movements"
                    value={formatCurrency(stats.totalMovements)}
                    icon={DollarSign}
                    color="orange"
                />
                <StatCard
                    title="Initial Patrimony"
                    value={formatCurrency(stats.patrimonyInitial)}
                    icon={Wallet}
                    color="teal"
                />
                <StatCard
                    title="Final Patrimony"
                    value={formatCurrency(stats.patrimonyFinal)}
                    icon={Wallet}
                    color="blue"
                />
            </div>

            {/* Secondary Stats (Max Gain/Loss) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-green-800 mb-1">Best Day Performance</p>
                            <h4 className="text-xl font-bold text-green-900">{formatCurrency(maxGain.gainLoss)}</h4>
                            <p className="text-sm text-green-600 mt-1">{maxGain.date}</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl shadow-sm">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-red-800 mb-1">Worst Day Performance</p>
                            <h4 className="text-xl font-bold text-red-900">{formatCurrency(maxLoss.gainLoss)}</h4>
                            <p className="text-sm text-red-600 mt-1">{maxLoss.date}</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl shadow-sm">
                            <TrendingDown className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}