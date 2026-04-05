import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { getCategoryTrendData } from '../../data/mockData';

const fmt     = v => `₹${(v / 1000).toFixed(1)}k`;
const fmtFull = v => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

const COLORS = {
  Food:          '#FF6B6B',
  Transport:     '#4ECDC4',
  Entertainment: '#45B7D1',
  Shopping:      '#DDA0DD',
  Health:        '#FFEAA7',
};
const ALL_CATS = Object.keys(COLORS);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-light)',
      borderRadius: '12px', padding: '14px 18px', boxShadow: 'var(--shadow-lg)', minWidth: 180,
    }}>
      <p style={{ fontWeight: 700, marginBottom: 10, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{label}</p>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 4 }}>
          <span style={{ color: p.color, fontSize: '0.78rem', fontWeight: 500 }}>{p.name}</span>
          <span style={{ color: p.color, fontSize: '0.82rem', fontWeight: 700 }}>{fmtFull(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function SpendingTrendChart() {
  const { state } = useApp();
  const [active, setActive] = useState(ALL_CATS);
  const data = getCategoryTrendData(state.transactions);

  const toggle = cat => {
    setActive(prev =>
      prev.includes(cat) ? (prev.length > 1 ? prev.filter(c => c !== cat) : prev) : [...prev, cat]
    );
  };

  return (
    <div className="card">
      <div className="card-header" style={{ flexWrap: 'wrap', gap: 10 }}>
        <h3 className="card-title">Spending Trend by Category</h3>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {ALL_CATS.map(cat => (
            <button
              key={cat}
              onClick={() => toggle(cat)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '3px 10px', borderRadius: 100, border: '1px solid',
                fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                background: active.includes(cat) ? `${COLORS[cat]}20` : 'transparent',
                color: active.includes(cat) ? COLORS[cat] : 'var(--text-muted)',
                borderColor: active.includes(cat) ? `${COLORS[cat]}40` : 'var(--border)',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: active.includes(cat) ? COLORS[cat] : 'var(--text-muted)' }} />
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={fmt} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} width={48} />
            <Tooltip content={<CustomTooltip />} />
            {ALL_CATS.filter(cat => active.includes(cat)).map(cat => (
              <Line
                key={cat}
                type="monotone"
                dataKey={cat}
                stroke={COLORS[cat]}
                strokeWidth={2}
                dot={{ fill: COLORS[cat], r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
