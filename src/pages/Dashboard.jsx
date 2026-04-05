import { useState } from 'react';
import { Plus, RefreshCw, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart';
import SpendingBreakdownChart from '../components/dashboard/SpendingBreakdownChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import TransactionModal from '../components/transactions/TransactionModal';

export default function Dashboard() {
  const { state, dispatch } = useApp();
  const isAdmin = state.role === 'admin';
  const [showModal, setShowModal] = useState(false);

  const handleExport = () => {
    const csv = [
      ['Date', 'Description', 'Category', 'Type', 'Amount', 'Notes'],
      ...state.transactions.map(t => [t.date, t.description, t.category, t.type, t.amount, t.notes || '']),
    ].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'transactions.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Overview</h1>
        <p>Track your finances at a glance — income, expenses, and balance trends.</p>
      </div>

      {isAdmin && (
        <div className="admin-actions-bar">
          <span className="admin-label">⚡ Admin Quick Actions</span>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)} id="dash-add-btn">
            <Plus size={14} /> Add Transaction
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleExport}>
            <Download size={14} /> Export CSV
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => { if (window.confirm('Reset to mock data?')) dispatch({ type: 'RESET_TRANSACTIONS' }); }}>
            <RefreshCw size={14} /> Reset Data
          </button>
        </div>
      )}

      <SummaryCards />

      <div className="charts-grid">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>

      <RecentTransactions />

      {showModal && <TransactionModal transaction={null} onClose={() => setShowModal(false)} />}
    </div>
  );
}
