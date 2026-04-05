import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';

const fmt        = v => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);
const formatDate = d => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });

export default function RecentTransactions() {
  const { state } = useApp();
  const recent = [...state.transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Recent Activity</h3>
        <Link to="/transactions" className="view-all-link">
          View All <ArrowRight size={13} />
        </Link>
      </div>
      <div className="card-body" style={{ padding: '14px 26px 22px' }}>
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
                  <div className="txn-avatar" style={{ background: `${cat.color}18` }}>
                    {cat.icon}
                  </div>
                  <div>
                    <p className="txn-desc">{txn.description}</p>
                    <p className="txn-date">{formatDate(txn.date)} · {txn.category}</p>
                  </div>
                </div>
                <div className="txn-amount-wrap">
                  <span className={txn.type === 'income' ? 'amount-income' : 'amount-expense'} style={{ fontSize: '0.88rem' }}>
                    {txn.type === 'income' ? '+' : '−'}{fmt(txn.amount)}
                  </span>
                  <span className={`badge badge-${txn.type}`} style={{ fontSize: '0.6rem' }}>{txn.type}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
