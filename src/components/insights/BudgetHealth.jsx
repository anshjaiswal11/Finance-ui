import { useApp } from '../../context/AppContext';
import { getCategoryBreakdown } from '../../data/mockData';

const fmt = v => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

// Estimated monthly budgets per category
const BUDGETS = {
  Food: 12000,
  Transport: 5000,
  Entertainment: 3000,
  Utilities: 5000,
  Health: 4000,
  Shopping: 8000,
  Investment: 60000, // 6 months
  Other: 3000,
};

export default function BudgetHealth() {
  const { state } = useApp();
  const breakdown = getCategoryBreakdown(state.transactions);

  // Only show expense categories that have a budget
  const items = breakdown
    .filter(c => c.name in BUDGETS)
    .map(c => {
      const budget = BUDGETS[c.name];
      const pct = Math.min((c.value / budget) * 100, 100);
      const over = c.value > budget;
      return { ...c, budget, pct, over };
    });

  const getBarColor = (pct, over) => {
    if (over) return '#ef4444';
    if (pct > 75) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Budget Health</h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Spend vs 6-month estimate</span>
      </div>
      <div className="card-body">
        {items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h3>No Budget Data</h3>
            <p>Add expense transactions to see budget health.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {items.map(item => (
              <div key={item.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="cat-dot" style={{ background: item.color, width: 10, height: 10 }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{item.name}</span>
                    {item.over && (
                      <span className="badge badge-expense" style={{ fontSize: '0.65rem' }}>Over budget</span>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: item.over ? 'var(--accent-red)' : 'var(--text-primary)' }}>
                      {fmt(item.value)}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}> / {fmt(item.budget)}</span>
                  </div>
                </div>
                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${item.pct}%`,
                      background: getBarColor(item.pct, item.over),
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    {item.pct.toFixed(0)}% used
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
