import { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { getSummaryStats } from '../../data/mockData';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

function useCountUp(target, duration = 900) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isPercent = el.dataset.percent === 'true';
    const start = 0;
    const startTime = performance.now();
    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      el.textContent = isPercent ? `${current.toFixed(1)}%` : formatCurrency(current);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [target, duration]);
  return ref;
}

const CARDS = [
  { key: 'totalBalance',      label: 'Total Balance',     icon: '💰', color: 'blue',   isPercent: false, trendKey: null, subKey: null, subLabel: 'Overall net' },
  { key: 'totalIncome',       label: 'Total Income',      icon: '📈', color: 'green',  isPercent: false, trendKey: 'incomeTrend', subKey: null, subLabel: '6-month total' },
  { key: 'totalExpense',      label: 'Total Expenses',    icon: '📉', color: 'red',    isPercent: false, trendKey: 'expenseTrend', subKey: null, subLabel: '6-month total' },
  { key: 'savingsRate',       label: 'Savings Rate',      icon: '🏦', color: 'purple', isPercent: true,  trendKey: null, subKey: null, subLabel: 'Of total income' },
  { key: 'currentMonthNet',   label: 'This Month Net',    icon: '📅', color: 'cyan',   isPercent: false, trendKey: null, subKey: null, subLabel: 'June income − exp.' },
];

function SummaryCardItem({ cardDef, stats }) {
  const { key, label, icon, color, isPercent, trendKey, subLabel } = cardDef;
  const value = stats[key];
  const trend = trendKey ? parseFloat(stats[trendKey]) : null;

  // For expense trend: lower is better; for income trend: higher is better
  const isGoodTrend = trendKey === 'expenseTrend' ? trend <= 0 : trend >= 0;

  const ref = useCountUp(value, 950);

  return (
    <div className={`summary-card ${color} slide-up`}>
      <div className="card-icon">{icon}</div>
      <p className="card-label">{label}</p>
      <p className="card-value">
        <span ref={ref} data-percent={isPercent}>
          {isPercent ? `${value}%` : formatCurrency(value)}
        </span>
      </p>

      {trend !== null ? (
        <div className={`card-trend ${isGoodTrend ? 'trend-up' : 'trend-down'}`}>
          {isGoodTrend ? <TrendingDown size={13} /> : <TrendingUp size={13} />}
          <span>{Math.abs(trend)}% vs last month</span>
        </div>
      ) : key === 'savingsRate' ? (
        <div className={`card-trend ${value >= 20 ? 'trend-up' : 'trend-down'}`}>
          {value >= 20 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          <span>{value >= 20 ? 'Healthy savings ✓' : 'Needs improvement'}</span>
        </div>
      ) : (
        <div className="card-trend" style={{ color: 'var(--text-muted)' }}>
          <ArrowUpRight size={13} />
          <span>{subLabel}</span>
        </div>
      )}
    </div>
  );
}

export default function SummaryCards() {
  const { state } = useApp();
  const stats = getSummaryStats(state.transactions);

  return (
    <div className="summary-grid">
      {CARDS.map(card => <SummaryCardItem key={card.key} cardDef={card} stats={stats} />)}
    </div>
  );
}
