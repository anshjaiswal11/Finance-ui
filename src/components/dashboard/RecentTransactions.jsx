import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';

const fmt = v => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

export default function RecentTransactions() {
  const { state } = useApp();
  const recent = [...state.transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Recent Activity</h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Last 6 transactions</span>
      </div>
      <div className="card-body" style={{ padding: '12px 20px 20px' }}>
        {recent.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No Transactions</h3>
            <p>Add some transactions to see activity.</p>
          </div>
        ) : (
          recent.map(txn => {
            const cat = CATEGORIES[txn.category] || CATEGORIES.Other;
            return (
              <div key={txn.id} className="recent-txn-row">
                <div className="recent-txn-left">
                  <div className="txn-avatar" style={{ background: `${cat.color}20` }}>
                    {cat.icon}
                  </div>
                  <div>
                    <p className="txn-desc">{txn.description}</p>
                    <p className="txn-date">{formatDate(txn.date)} · {txn.category}</p>
                  </div>
                </div>
                <p className={txn.type === 'income' ? 'amount-income' : 'amount-expense'} style={{ fontWeight: 600, fontSize: '0.9rem', flexShrink: 0 }}>
                  {txn.type === 'income' ? '+' : '-'}{fmt(txn.amount)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
