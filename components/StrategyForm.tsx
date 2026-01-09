
import React, { useState } from 'react';
import { UserProfile, RiskTolerance } from '../types';

interface StrategyFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

const StrategyForm: React.FC<StrategyFormProps> = ({ onSubmit, isLoading }) => {
  const [profile, setProfile] = useState<UserProfile>({
    capital: 10000,
    horizon: 5,
    risk: RiskTolerance.BALANCED,
    goal: 'Retirement'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1.5">Initial Capital ($)</label>
        <input 
          type="number" 
          value={profile.capital}
          onChange={(e) => setProfile({...profile, capital: Number(e.target.value)})}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          placeholder="e.g. 10000"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1.5">Investment Horizon (Years)</label>
        <input 
          type="number" 
          value={profile.horizon}
          onChange={(e) => setProfile({...profile, horizon: Number(e.target.value)})}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          placeholder="e.g. 5"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1.5">Risk Tolerance</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.values(RiskTolerance).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setProfile({...profile, risk: r})}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                profile.risk === r 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1.5">Primary Goal</label>
        <select 
          value={profile.goal}
          onChange={(e) => setProfile({...profile, goal: e.target.value})}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
        >
          <option>Wealth Accumulation</option>
          <option>Retirement</option>
          <option>Buy a House</option>
          <option>Emergency Fund</option>
          <option>High-Risk Speculation</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/10 disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : (
          <>
            <span>Orchestrate Strategy</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
};

export default StrategyForm;
