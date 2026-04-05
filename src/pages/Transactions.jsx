import { useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import FilterBar from '../components/transactions/FilterBar';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionModal from '../components/transactions/TransactionModal';

export default function Transactions() {
  const { state, dispatch } = useApp();
  const isAdmin = state.role === 'admin';
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1>Transactions</h1>
          <p>View, filter, search and manage all your financial records.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {isAdmin && (
            <>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => { if (window.confirm('Reset to original mock data?')) dispatch({ type: 'RESET_TRANSACTIONS' }); }}
                title="Reset data"
              >
                <RefreshCw size={15} /> Reset Data
              </button>
              <button className="btn btn-primary" onClick={() => setShowModal(true)} id="add-transaction-btn">
                <Plus size={17} /> Add Transaction
              </button>
            </>
          )}
          {!isAdmin && (
            <div className="badge badge-viewer" style={{ padding: '8px 14px', borderRadius: 'var(--radius-sm)' }}>
              👁️ Viewer Mode — Read Only
            </div>
          )}
        </div>
      </div>

      <FilterBar />
      <TransactionTable />

      {showModal && (
        <TransactionModal transaction={null} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
