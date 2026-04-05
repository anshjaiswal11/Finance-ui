import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { getMonthlyData } from '../../data/mockData';

const fmt = v => `₹${(v / 1000).toFixed(0)}k`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const fmtFull = v => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-light)',
      borderRadius: '10px', padding: '12px 16px', boxShadow: 'var(--shadow-md)',
    }}>
      <p style={{ fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.fill, fontSize: '0.82rem', marginBottom: 2 }}>
          {p.name}: {fmtFull(p.value)}
        </p>
      ))}
      {payload.length === 2 && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: 6, borderTop: '1px solid var(--border)', paddingTop: 6 }}>
          Net: {fmtFull(payload[0].value - payload[1].value)}
        </p>
      )}
    </div>
  );
};

export default function MonthlyComparisonChart() {
  const { state } = useApp();
  const data = getMonthlyData(state.transactions);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Monthly Income vs Expenses</h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Jan – Jun 2024</span>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }} barCategoryGap="25%">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={fmt} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} width={52} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '12px' }} />
            <Bar dataKey="income"  name="Income"  fill="#10b981" radius={[5, 5, 0, 0]} maxBarSize={40} />
            <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[5, 5, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
