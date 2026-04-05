import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../../context/AppContext';
import { getCategoryBreakdown } from '../../data/mockData';

const fmt = v => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value, payload: p } = payload[0];
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-light)',
      borderRadius: '12px', padding: '12px 16px', boxShadow: 'var(--shadow-lg)',
    }}>
      <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.84rem' }}>{name}</p>
      <p style={{ color: p.color, fontSize: '0.82rem', fontWeight: 700, marginTop: 4 }}>{fmt(value)}</p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: 2 }}>{p.percent}% of total</p>
    </div>
  );
};

export default function SpendingBreakdownChart() {
  const { state } = useApp();
  const data = getCategoryBreakdown(state.transactions);

  if (!data.length) {
    return (
      <div className="card">
        <div className="card-header"><h3 className="card-title">Spending Breakdown</h3></div>
        <div className="empty-state"><div className="empty-icon">📊</div><h3>No Data</h3><p>No expense data to display.</p></div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Spending Breakdown</h3>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '3px 10px', borderRadius: 100, border: '1px solid var(--border)' }}>
          By category
        </span>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%" cy="50%"
              innerRadius={60} outerRadius={90}
              paddingAngle={3} dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Ranked legend */}
        <div className="category-legend">
          {data.slice(0, 6).map((cat, i) => (
            <div key={cat.name} className="cat-legend-row">
              <div className="cat-legend-left">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', width: 16 }}>
                  {i + 1}
                </span>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color, display: 'inline-block', flexShrink: 0 }} />
                <span className="cat-legend-name">{cat.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="cat-legend-pct">{cat.percent}%</span>
                <span className="cat-legend-amt">{fmt(cat.value)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
