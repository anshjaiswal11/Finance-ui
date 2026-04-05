import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { ChevronUp, ChevronDown, Edit2, Trash2, ArrowUpDown } from 'lucide-react';
import TransactionModal from './TransactionModal';

const ITEMS_PER_PAGE = 10;

const fmt = v => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);
const formatDate = d => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

function applyFilters(transactions, filters) {
  let list = [...transactions];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(t =>
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  }
  if (filters.category !== 'All') list = list.filter(t => t.category === filters.category);
  if (filters.type !== 'All') list = list.filter(t => t.type === filters.type);
  if (filters.dateFrom) list = list.filter(t => t.date >= filters.dateFrom);
  if (filters.dateTo) list = list.filter(t => t.date <= filters.dateTo);

  list.sort((a, b) => {
    let aVal = a[filters.sortBy];
    let bVal = b[filters.sortBy];
    if (filters.sortBy === 'date') { aVal = new Date(aVal); bVal = new Date(bVal); }
    if (filters.sortBy === 'amount') { aVal = parseFloat(aVal); bVal = parseFloat(bVal); }
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    if (aVal < bVal) return filters.sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return filters.sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  return list;
}

export default function TransactionTable() {
  const { state, dispatch } = useApp();
  const { role, transactions, filters, currentPage } = state;
  const isAdmin = role === 'admin';
  const [editTxn, setEditTxn] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = applyFilters(transactions, filters);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSort = (col) => {
    if (filters.sortBy === col) {
      dispatch({ type: 'SET_FILTERS', payload: { sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' } });
    } else {
      dispatch({ type: 'SET_FILTERS', payload: { sortBy: col, sortDir: 'desc' } });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  };

  const SortIcon = ({ col }) => {
    if (filters.sortBy !== col) return <ArrowUpDown size={13} style={{ opacity: 0.35 }} />;
    return filters.sortDir === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />;
  };

  const setPage = (p) => dispatch({ type: 'SET_PAGE', payload: p });

  return (
    <>
      <div className="card">
        <div className="table-wrapper">
          {paginated.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No transactions found</h3>
              <p>Try changing your filters or search term.</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort('date')} className={filters.sortBy === 'date' ? 'sorted' : ''}>
                    Date <span className="sort-icon"><SortIcon col="date" /></span>
                  </th>
                  <th>Description</th>
                  <th onClick={() => handleSort('category')} className={filters.sortBy === 'category' ? 'sorted' : ''}>
                    Category <span className="sort-icon"><SortIcon col="category" /></span>
                  </th>
                  <th>Type</th>
                  <th onClick={() => handleSort('amount')} className={filters.sortBy === 'amount' ? 'sorted' : ''} style={{ textAlign: 'right' }}>
                    Amount <span className="sort-icon"><SortIcon col="amount" /></span>
                  </th>
                  {isAdmin && <th style={{ textAlign: 'center' }}>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {paginated.map(txn => {
                  const cat = CATEGORIES[txn.category] || CATEGORIES.Other;
                  return (
                    <tr key={txn.id}>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                        {formatDate(txn.date)}
                      </td>
                      <td style={{ fontWeight: 500 }}>{txn.description}</td>
                      <td>
                        <div className="cat-cell">
                          <span className="cat-dot" style={{ background: cat.color }} />
                          {txn.category}
                        </div>
                      </td>
                      <td>
                        <span className={`badge badge-${txn.type}`}>
                          {txn.type}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={txn.type === 'income' ? 'amount-income' : 'amount-expense'}>
                          {txn.type === 'income' ? '+' : '-'}{fmt(txn.amount)}
                        </span>
                      </td>
                      {isAdmin && (
                        <td>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                            <button
                              className="btn btn-sm btn-secondary btn-icon"
                              onClick={() => { setEditTxn(txn); setShowModal(true); }}
                              title="Edit"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              className="btn btn-sm btn-danger btn-icon"
                              onClick={() => handleDelete(txn.id)}
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <span className="pagination-info">
              Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className="pagination-controls">
              <button className="page-btn" onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>‹</button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  className={`page-btn ${p === currentPage ? 'active' : ''}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button className="page-btn" onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <TransactionModal
          transaction={editTxn}
          onClose={() => { setShowModal(false); setEditTxn(null); }}
        />
      )}
    </>
  );
}
