
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative flex items-center justify-between">
      <div className="z-10">
        <h1 className="text-5xl md:text-6xl text-white tracking-tight">
          Cacophony of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Capital</span>
        </h1>
        <p className="mt-4 text-slate-400 text-lg max-w-2xl leading-relaxed">
          The investment landscape is loud. We filter the noise to orchestrate your wealth across 
          high-yield NBFCs, stable Banks, and disruptive Startups.
        </p>
      </div>
      <div className="hidden lg:block absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
    </header>
  );
};

export default Header;
