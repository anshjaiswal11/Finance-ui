import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../../context/AppContext';
import { getIncomeBreakdown } from '../../data/mockData';

const fmt = v => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value, payload: p } = payload[0];
  const total = p.total;
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-light)',
      borderRadius: '12px', padding: '12px 16px', boxShadow: 'var(--shadow-lg)',
    }}>
      <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.84rem' }}>{name}</p>
      <p style={{ color: p.color, fontSize: '0.82rem', fontWeight: 700, marginTop: 4 }}>{fmt(value)}</p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: 2 }}>
        {total > 0 ? ((value / total) * 100).toFixed(1) : 0}% of income
      </p>
    </div>
  );
};

export default function IncomeSourceBreakdown() {
  const { state } = useApp();
  const rawData = getIncomeBreakdown(state.transactions);
  const total   = rawData.reduce((s, d) => s + d.value, 0);
  const data    = rawData.map(d => ({ ...d, total }));

  if (!data.length) {
    return (
      <div className="card">
        <div className="card-header"><h3 className="card-title">Income Sources</h3></div>
        <div className="empty-state"><div className="empty-icon">💹</div><h3>No Income Data</h3></div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Income Sources</h3>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '3px 10px', borderRadius: 100, border: '1px solid var(--border)' }}>
          By source
        </span>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data} cx="50%" cy="50%"
              innerRadius={55} outerRadius={80}
              paddingAngle={4} dataKey="value" strokeWidth={0}
            >
              {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
          {data.map(d => (
            <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, display: 'inline-block' }} />
                <span style={{ fontSize: '0.84rem', fontWeight: 500 }}>{d.name}</span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {((d.value / total) * 100).toFixed(1)}%
                </span>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--accent-green)' }}>
                  {fmt(d.value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
