import { useApp } from '../../context/AppContext';
import { getSummaryStats } from '../../data/mockData';
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, Percent } from 'lucide-react';

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

const cards = [
  {
    key: 'totalBalance',
    label: 'Total Balance',
    icon: '💰',
    color: 'blue',
    trendKey: null,
  },
  {
    key: 'totalIncome',
    label: 'Total Income',
    icon: '📈',
    color: 'green',
    trendKey: null,
  },
  {
    key: 'totalExpense',
    label: 'Total Expenses',
    icon: '📉',
    color: 'red',
    trendKey: 'expenseTrend',
  },
  {
    key: 'savingsRate',
    label: 'Savings Rate',
    icon: '🏦',
    color: 'purple',
    isPercent: true,
  },
];

export default function SummaryCards() {
  const { state } = useApp();
  const stats = getSummaryStats(state.transactions);

  return (
    <div className="summary-grid">
      {cards.map(({ key, label, icon, color, trendKey, isPercent }) => {
        const value = stats[key];
        const trend = trendKey ? parseFloat(stats[trendKey]) : null;
        const isPositiveTrend = trend !== null ? trend <= 0 : null; // lower expense = good

        return (
          <div key={key} className={`summary-card ${color} slide-up`}>
            <div className="card-icon">{icon}</div>
            <p className="card-label">{label}</p>
            <p className="card-value">
              {isPercent ? `${value}%` : formatCurrency(value)}
            </p>
            {trend !== null && (
              <div className={`card-trend ${isPositiveTrend ? 'trend-up' : 'trend-down'}`}>
                {isPositiveTrend ? <TrendingDown size={13} /> : <TrendingUp size={13} />}
                <span>{Math.abs(trend)}% vs last month</span>
              </div>
            )}
            {trendKey === null && key === 'totalIncome' && (
              <div className="card-trend trend-up">
                <ArrowUpRight size={13} />
                <span>6-month total</span>
              </div>
            )}
            {trendKey === null && key === 'totalBalance' && (
              <div className="card-trend trend-up">
                <ArrowUpRight size={13} />
                <span>Overall net balance</span>
              </div>
            )}
            {key === 'savingsRate' && (
              <div className={`card-trend ${value >= 20 ? 'trend-up' : 'trend-down'}`}>
                {value >= 20 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                <span>{value >= 20 ? 'Healthy savings' : 'Save more!'}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
