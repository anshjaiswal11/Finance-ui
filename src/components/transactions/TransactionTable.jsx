import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { ChevronUp, ChevronDown, Edit2, Trash2, ArrowUpDown, ChevronRight } from 'lucide-react';
import TransactionModal from './TransactionModal';

const ITEMS_PER_PAGE = 10;

const fmt        = v => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);
const formatDate = d => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

function applyFilters(transactions, filters) {
  let list = [...transactions];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(t =>
      t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    );
  }
  if (filters.category !== 'All') list = list.filter(t => t.category === filters.category);
  if (filters.type !== 'All')     list = list.filter(t => t.type === filters.type);
  if (filters.dateFrom)           list = list.filter(t => t.date >= filters.dateFrom);
  if (filters.dateTo)             list = list.filter(t => t.date <= filters.dateTo);
  if (filters.amountMin)          list = list.filter(t => t.amount >= parseFloat(filters.amountMin));
  if (filters.amountMax)          list = list.filter(t => t.amount <= parseFloat(filters.amountMax));

  list.sort((a, b) => {
    let aVal = a[filters.sortBy], bVal = b[filters.sortBy];
    if (filters.sortBy === 'date')   { aVal = new Date(aVal); bVal = new Date(bVal); }
    if (filters.sortBy === 'amount') { aVal = parseFloat(aVal); bVal = parseFloat(bVal); }
    if (typeof aVal === 'string') { aVal = aVal.toLowerCase(); bVal = bVal.toLowerCase(); }
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
  const [editTxn,   setEditTxn]   = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expanded,  setExpanded]  = useState(null); // row id

  const filtered    = applyFilters(transactions, filters);
  const totalPages  = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated   = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const setPage = p => dispatch({ type: 'SET_PAGE', payload: p });

  // Filtered totals
  const filteredIncome  = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const filteredExpense = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const filteredNet     = filteredIncome - filteredExpense;

  const handleSort = col => {
    if (filters.sortBy === col) {
      dispatch({ type: 'SET_FILTERS', payload: { sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' } });
    } else {
      dispatch({ type: 'SET_FILTERS', payload: { sortBy: col, sortDir: 'desc' } });
    }
  };

  const handleDelete = id => {
    if (window.confirm('Delete this transaction?')) dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const toggleExpand = id => setExpanded(prev => (prev === id ? null : id));

  const SortIcon = ({ col }) => {
    if (filters.sortBy !== col) return <ArrowUpDown size={12} style={{ opacity: 0.3 }} />;
    return filters.sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  // Pagination with ellipsis
  const getPageNums = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

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
                  <th style={{ width: 36, paddingRight: 0 }} />
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
                  const cat      = CATEGORIES[txn.category] || CATEGORIES.Other;
                  const isOpen   = expanded === txn.id;
                  return [
                    <tr
                      key={txn.id}
                      onClick={() => toggleExpand(txn.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td style={{ paddingRight: 0, color: 'var(--text-muted)' }}>
                        <ChevronRight
                          size={14}
                          style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                        />
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                        {formatDate(txn.date)}
                      </td>
                      <td style={{ fontWeight: 600 }}>{txn.description}</td>
                      <td>
                        <div className="cat-cell">
                          <span className="cat-dot" style={{ background: cat.color }} />
                          <span style={{ fontSize: '0.85rem' }}>{cat.icon} {txn.category}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge badge-${txn.type}`}>{txn.type}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={txn.type === 'income' ? 'amount-income' : 'amount-expense'}>
                          {txn.type === 'income' ? '+' : '−'}{fmt(txn.amount)}
                        </span>
                      </td>
                      {isAdmin && (
                        <td onClick={e => e.stopPropagation()}>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                            <button
                              className="btn btn-sm btn-secondary btn-icon"
                              onClick={() => { setEditTxn(txn); setShowModal(true); }}
                              title="Edit"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              className="btn btn-sm btn-danger btn-icon"
                              onClick={() => handleDelete(txn.id)}
                              title="Delete"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>,
                    isOpen && (
                      <tr key={`${txn.id}-detail`} className="row-detail">
                        <td colSpan={isAdmin ? 7 : 6}>
                          <div className="detail-grid">
                            <div className="detail-item">
                              <label>Full Date</label>
                              <span>{new Date(txn.date).toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <div className="detail-item">
                              <label>Transaction ID</label>
                              <span>#{txn.id}</span>
                            </div>
                            <div className="detail-item">
                              <label>Category</label>
                              <span>{cat.icon} {txn.category}</span>
                            </div>
                            <div className="detail-item">
                              <label>Notes</label>
                              <span>{txn.notes || '—'}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ),
                  ];
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Filter totals footer */}
        {filtered.length > 0 && (
          <div className="table-footer-row">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
            </span>
            <div className="footer-stat">
              <span className="fs-label">Income</span>
              <span className="fs-value" style={{ color: 'var(--accent-green)' }}>+{fmt(filteredIncome)}</span>
            </div>
            <div className="footer-stat">
              <span className="fs-label">Expense</span>
              <span className="fs-value" style={{ color: 'var(--accent-red)' }}>−{fmt(filteredExpense)}</span>
            </div>
            <div className="footer-stat">
              <span className="fs-label">Net</span>
              <span className="fs-value" style={{ color: filteredNet >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                {filteredNet >= 0 ? '+' : '−'}{fmt(Math.abs(filteredNet))}
              </span>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <span className="pagination-info">
              Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className="pagination-controls">
              <button className="page-btn" onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>‹</button>
              {getPageNums().map((p, i) =>
                p === '...'
                  ? <span key={`el-${i}`} style={{ padding: '0 4px', color: 'var(--text-muted)', alignSelf: 'center' }}>…</span>
                  : <button key={p} className={`page-btn ${p === currentPage ? 'active' : ''}`} onClick={() => setPage(p)}>{p}</button>
              )}
              <button className="page-btn" onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <TransactionModal transaction={editTxn} onClose={() => { setShowModal(false); setEditTxn(null); }} />
      )}
    </>
  );
}
