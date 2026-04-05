import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getCategoryBreakdown } from '../../data/mockData';
import { Pencil, Check } from 'lucide-react';

const fmt = v => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

const getBarColor = (pct, over) => {
  if (over) return '#ef4444';
  if (pct > 75) return '#f59e0b';
  return '#10b981';
};

export default function BudgetHealth() {
  const { state, dispatch } = useApp();
  const isAdmin = state.role === 'admin';
  const breakdown = getCategoryBreakdown(state.transactions);
  const { budgets } = state;

  const [editing, setEditing] = useState(null); // category name
  const [editVal, setEditVal] = useState('');

  const items = breakdown
    .filter(c => budgets[c.name] != null)
    .map(c => {
      const budget = budgets[c.name];
      const pct = Math.min((c.value / budget) * 100, 100);
      const over = c.value > budget;
      return { ...c, budget, pct, over };
    });

  const startEdit = (cat, currentBudget) => {
    setEditing(cat);
    setEditVal(String(currentBudget));
  };

  const saveEdit = cat => {
    const val = parseFloat(editVal);
    if (!isNaN(val) && val > 0) {
      dispatch({ type: 'SET_BUDGET', payload: { category: cat, value: val } });
    }
    setEditing(null);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Budget Health</h3>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '3px 10px', borderRadius: 100, border: '1px solid var(--border)' }}>
          6-month estimate
        </span>
      </div>
      <div className="card-body">
        {items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h3>No Budget Data</h3>
            <p>Add expense transactions to see budget health.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {items.map(item => (
              <div key={item.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</span>
                    {item.over && <span className="badge badge-expense" style={{ fontSize: '0.62rem' }}>Over budget</span>}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: item.over ? 'var(--accent-red)' : 'var(--text-primary)' }}>
                      {fmt(item.value)}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>/</span>

                    {isAdmin && editing === item.name ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <input
                          className="budget-edit-input"
                          type="number"
                          value={editVal}
                          onChange={e => setEditVal(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') saveEdit(item.name); if (e.key === 'Escape') setEditing(null); }}
                          autoFocus
                          min={1}
                        />
                        <button className="btn btn-success btn-sm btn-icon" style={{ width: 28, height: 28 }} onClick={() => saveEdit(item.name)}>
                          <Check size={12} />
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{fmt(item.budget)}</span>
                        {isAdmin && (
                          <button
                            className="btn btn-secondary btn-sm btn-icon"
                            style={{ width: 26, height: 26 }}
                            onClick={() => startEdit(item.name, item.budget)}
                            title="Edit budget"
                          >
                            <Pencil size={11} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${item.pct}%`, background: getBarColor(item.pct, item.over) }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{item.pct.toFixed(0)}% used</span>
                  {item.over && (
                    <span style={{ fontSize: '0.68rem', color: 'var(--accent-red)', fontWeight: 600 }}>
                      {fmt(item.value - item.budget)} over
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {isAdmin && <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 16, padding: '10px 0 0', borderTop: '1px solid var(--border)' }}>
          ✏️ Click the pencil icon to edit a budget estimate.
        </p>}
      </div>
    </div>
  );
}
