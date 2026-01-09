
import React, { useState, useCallback } from 'react';
import { UserProfile, InvestmentStrategy, RiskTolerance } from './types';
import { generateStrategy } from './services/geminiService';
import Header from './components/Header';
import StrategyForm from './components/StrategyForm';
import StrategyDisplay from './components/StrategyDisplay';
import Visualizer from './components/Visualizer';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<InvestmentStrategy | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);

  const handleGenerate = useCallback(async (profile: UserProfile) => {
    setLoading(true);
    setError(null);
    setCurrentProfile(profile);
    try {
      const result = await generateStrategy(profile);
      setStrategy(result);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while generating your strategy.');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Header />
      
      <main className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <section className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Strategy Profile</h2>
            <StrategyForm onSubmit={handleGenerate} isLoading={loading} />
          </section>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/50 text-red-200 rounded-xl">
              <p className="font-medium">Error</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          )}

          <section className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <h3 className="text-lg font-medium mb-3 text-slate-300">Why start now?</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">✔</span>
                <span><b>Power of Compounding:</b> Even 1% extra return makes a fortune over 10 years.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">✔</span>
                <span><b>Diversification:</b> NBFCs often offer 2-3% higher yields than traditional banks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">✔</span>
                <span><b>Startup Access:</b> Equity in the right startup can deliver 100x returns.</span>
              </li>
            </ul>
          </section>
        </div>

        <div className="lg:col-span-8">
          {!strategy && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-800">
              <div className="w-20 h-20 mb-6 bg-slate-800 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-slate-300">No strategy generated yet</h3>
              <p className="text-slate-500 mt-2 max-w-sm">Complete the profile form to generate a customized capital growth plan orchestrated by Gemini AI.</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="text-emerald-400 font-medium animate-pulse">Orchestrating your financial future...</p>
            </div>
          )}

          {strategy && !loading && (
            <div className="space-y-8 animate-in fade-in duration-700">
              <Visualizer strategy={strategy} profile={currentProfile!} />
              <StrategyDisplay strategy={strategy} />
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 py-8 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>&copy; 2024 Cacophony of Capital. All rights reserved.</p>
        <p className="mt-2 text-xs italic">Disclaimer: Investment strategies generated are for educational purposes only. Always consult a certified financial advisor before making decisions.</p>
      </footer>
    </div>
  );
};

export default App;
