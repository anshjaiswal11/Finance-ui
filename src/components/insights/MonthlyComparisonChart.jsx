import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { getMonthlyData } from '../../data/mockData';

const fmt     = v => `₹${(v / 1000).toFixed(0)}k`;
const fmtFull = v => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-light)',
      borderRadius: '12px', padding: '14px 18px', boxShadow: 'var(--shadow-lg)', minWidth: 190,
    }}>
      <p style={{ fontWeight: 700, marginBottom: 10, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{label}</p>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 20, marginBottom: 4 }}>
          <span style={{ color: p.color, fontSize: '0.78rem', fontWeight: 500 }}>{p.name}</span>
          <span style={{ color: p.color, fontSize: '0.82rem', fontWeight: 700 }}>{fmtFull(p.value)}</span>
        </div>
      ))}
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
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '3px 10px', borderRadius: 100, border: '1px solid var(--border)' }}>
          Jan – Jun 2024
        </span>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={290}>
          <ComposedChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }} barCategoryGap="28%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={fmt} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} width={52} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: 14, fontSize: '0.75rem' }} />
            <Bar dataKey="income"  name="Income"       fill="#10b981" radius={[6,6,0,0]} maxBarSize={38} opacity={0.9} />
            <Bar dataKey="expense" name="Expense"      fill="#ef4444" radius={[6,6,0,0]} maxBarSize={38} opacity={0.9} />
            <Line
              type="monotone" dataKey="balance" name="Net Savings"
              stroke="#a855f7" strokeWidth={2.5}
              dot={{ fill: '#a855f7', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
