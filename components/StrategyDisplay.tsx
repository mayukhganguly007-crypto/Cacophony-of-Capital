
import React from 'react';
import { InvestmentStrategy } from '../types';

interface StrategyDisplayProps {
  strategy: InvestmentStrategy;
}

const StrategyDisplay: React.FC<StrategyDisplayProps> = ({ strategy }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {strategy.allocations.map((item, idx) => (
          <div key={idx} className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-slate-600 transition-colors group">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-xl font-bold text-slate-200">{item.category}</h4>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-bold">
                {item.percentage}%
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">{item.description}</p>
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <div className="text-xs">
                <p className="text-slate-500 uppercase tracking-wider mb-1">Expected Return</p>
                <p className="text-emerald-400 font-semibold">{item.expectedReturn}</p>
              </div>
              <div className="text-xs text-right">
                <p className="text-slate-500 uppercase tracking-wider mb-1">Risk Profile</p>
                <p className={`font-semibold ${
                  item.riskLevel === 'Low' ? 'text-green-400' :
                  item.riskLevel === 'Medium' ? 'text-yellow-400' :
                  item.riskLevel === 'High' ? 'text-orange-400' : 'text-red-400'
                }`}>{item.riskLevel}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-indigo-900/20 border border-indigo-500/30 rounded-2xl">
        <h3 className="text-lg font-bold text-indigo-300 mb-2 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Strategic Advice
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {strategy.advice.map((tip, idx) => (
            <li key={idx} className="text-slate-400 text-sm flex gap-3">
              <span className="text-indigo-400 font-bold">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StrategyDisplay;
