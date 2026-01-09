
export enum RiskTolerance {
  CONSERVATIVE = 'Conservative',
  BALANCED = 'Balanced',
  AGGRESSIVE = 'Aggressive'
}

export interface UserProfile {
  capital: number;
  horizon: number; // years
  risk: RiskTolerance;
  goal: string;
}

export interface Allocation {
  category: 'Startups' | 'Banks' | 'NBFCs' | 'Growth Funds';
  percentage: number;
  description: string;
  expectedReturn: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
}

export interface InvestmentStrategy {
  allocations: Allocation[];
  summary: string;
  projectedValue: number;
  advice: string[];
}
