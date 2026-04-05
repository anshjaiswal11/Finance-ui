import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine,
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
      borderRadius: '12px', padding: '14px 18px', boxShadow: 'var(--shadow-lg)',
      minWidth: 180,
    }}>
      <p style={{ fontWeight: 700, marginBottom: 10, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{label}</p>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, marginBottom: 4 }}>
          <span style={{ color: p.color, fontSize: '0.78rem', fontWeight: 500 }}>{p.name}</span>
          <span style={{ color: p.color, fontSize: '0.82rem', fontWeight: 700 }}>{fmtFull(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

const CustomLegend = ({ payload }) => (
  <div style={{ display: 'flex', gap: 20, justifyContent: 'center', paddingTop: 14 }}>
    {payload.map(p => (
      <div key={p.value} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{p.value}</span>
      </div>
    ))}
  </div>
);

export default function BalanceTrendChart() {
  const { state } = useApp();
  const data = getMonthlyData(state.transactions);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Balance Trend</h3>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '3px 10px', borderRadius: 100, border: '1px solid var(--border)' }}>
          Jan – Jun 2024
        </span>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={290}>
          <AreaChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="expenseG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="balanceG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={fmt} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} width={52} />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.12)" strokeDasharray="4 4" />
            <Area type="monotone" dataKey="income"  name="Income"  stroke="#10b981" strokeWidth={2.5} fill="url(#incomeG)"  dot={false} activeDot={{ r: 5, strokeWidth: 0, fill: '#10b981' }} />
            <Area type="monotone" dataKey="expense" name="Expense" stroke="#ef4444" strokeWidth={2.5} fill="url(#expenseG)" dot={false} activeDot={{ r: 5, strokeWidth: 0, fill: '#ef4444' }} />
            <Area type="monotone" dataKey="balance" name="Balance" stroke="#6366f1" strokeWidth={2.5} fill="url(#balanceG)" dot={false} activeDot={{ r: 5, strokeWidth: 0, fill: '#6366f1' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
