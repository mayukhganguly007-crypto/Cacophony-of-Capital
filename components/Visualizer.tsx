
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { InvestmentStrategy, UserProfile } from '../types';

interface VisualizerProps {
  strategy: InvestmentStrategy;
  profile: UserProfile;
}

const COLORS = ['#10b981', '#06b6d4', '#6366f1', '#f59e0b'];

const Visualizer: React.FC<VisualizerProps> = ({ strategy, profile }) => {
  const pieData = strategy.allocations.map(a => ({
    name: a.category,
    value: a.percentage
  }));

  // Simple projection data for chart
  const projectionData = Array.from({ length: profile.horizon + 1 }).map((_, i) => {
    const growthFactor = strategy.projectedValue / profile.capital;
    const yearGrowth = 1 + (Math.pow(growthFactor, 1/profile.horizon) - 1) * i;
    return {
      year: `Year ${i}`,
      value: Math.round(profile.capital * yearGrowth)
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-slate-900/50 p-6 border border-slate-800 rounded-3xl">
        <h3 className="text-lg font-semibold mb-4 text-slate-300">Portfolio Distribution</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', color: '#f1f5f9' }}
                itemStyle={{ color: '#10b981' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900/50 p-6 border border-slate-800 rounded-3xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-300">Growth Projection</h3>
          <div className="text-right">
            <span className="text-xs text-slate-500 block uppercase">Final Estimate</span>
            <span className="text-emerald-400 font-bold">${strategy.projectedValue.toLocaleString()}</span>
          </div>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="year" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
              <Tooltip 
                cursor={{ fill: '#1e293b' }}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
              />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
