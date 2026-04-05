import { useApp } from '../../context/AppContext';
import { getCategoryBreakdown, getMonthlyData, getSummaryStats, CATEGORIES } from '../../data/mockData';

const fmt = v => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

export default function InsightCards() {
  const { state } = useApp();
  const { transactions } = state;

  const expenses = transactions.filter(t => t.type === 'expense');
  const incomes  = transactions.filter(t => t.type === 'income');

  const categoryBreakdown = getCategoryBreakdown(transactions);
  const topCategory = categoryBreakdown[0] || null;

  const totalExpenses = expenses.reduce((s, t) => s + t.amount, 0);
  const dates = expenses.map(t => new Date(t.date));
  const dayRange = dates.length
    ? Math.max(1, Math.ceil((Math.max(...dates) - Math.min(...dates)) / (1000 * 60 * 60 * 24)) + 1) : 1;
  const avgDaily = totalExpenses / dayRange;

  const catCount = {};
  expenses.forEach(t => { catCount[t.category] = (catCount[t.category] || 0) + 1; });
  const freqCat = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0];

  const monthlyData = getMonthlyData(transactions);
  const bestMonth  = [...monthlyData].sort((a, b) => b.balance - a.balance)[0];
  const worstMonth = [...monthlyData].sort((a, b) => a.balance - b.balance)[0];

  const totalIncome  = incomes.reduce((s, t) => s + t.amount, 0);
  const avgMonthlyIncome = totalIncome / 6;

  const totalIncomeAvgItem = {
    label: 'Avg Monthly Income',
    value: fmt(avgMonthlyIncome),
    sub: 'Average over 6 months',
    icon: '💹',
    bg: 'rgba(16,185,129,0.12)',
  };

  const cards = [
    {
      label: 'Top Spending Category',
      value: topCategory ? topCategory.name : 'N/A',
      sub: topCategory ? `${fmt(topCategory.value)} total · ${topCategory.percent}% of expenses` : 'No data',
      icon: topCategory ? (CATEGORIES[topCategory.name]?.icon || '📌') : '📌',
      bg: topCategory ? `${topCategory.color}20` : 'rgba(255,255,255,0.05)',
      progress: topCategory ? parseFloat(topCategory.percent) : 0,
      progressColor: topCategory?.color,
    },
    {
      label: 'Average Daily Spend',
      value: fmt(avgDaily),
      sub: `Over ${dayRange} tracked days`,
      icon: '📅',
      bg: 'rgba(99,102,241,0.12)',
    },
    {
      label: 'Most Frequent Category',
      value: freqCat ? freqCat[0] : 'N/A',
      sub: freqCat ? `${freqCat[1]} transactions` : 'No data',
      icon: freqCat ? (CATEGORIES[freqCat[0]]?.icon || '📌') : '📌',
      bg: 'rgba(16,185,129,0.12)',
    },
    {
      label: 'Best Savings Month',
      value: bestMonth?.month || 'N/A',
      sub: bestMonth ? `Saved ${fmt(bestMonth.balance)}` : 'No data',
      icon: '🏆',
      bg: 'rgba(245,158,11,0.12)',
    },
    {
      label: 'Worst Spending Month',
      value: worstMonth?.month || 'N/A',
      sub: worstMonth ? `Net ${fmt(worstMonth.balance)}` : 'No data',
      icon: '⚠️',
      bg: 'rgba(239,68,68,0.12)',
    },
    totalIncomeAvgItem,
  ];

  return (
    <div className="insights-grid">
      {cards.map((card, i) => (
        <div key={i} className="insight-card slide-up" style={{ animationDelay: `${i * 0.06}s` }}>
          <div className="insight-icon" style={{ background: card.bg }}>{card.icon}</div>
          <p className="insight-label">{card.label}</p>
          <p className="insight-value">{card.value}</p>
          <p className="insight-sub">{card.sub}</p>
          {card.progress != null && (
            <div className="progress-bar-wrap">
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${Math.min(card.progress, 100)}%`, background: card.progressColor || 'var(--accent-blue)' }} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
