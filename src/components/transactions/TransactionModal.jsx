import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { X } from 'lucide-react';

const EMPTY_FORM = {
  date: new Date().toISOString().split('T')[0],
  description: '',
  amount: '',
  category: 'Food',
  type: 'expense',
};

export default function TransactionModal({ transaction, onClose }) {
  const isEdit = !!transaction;
  const { dispatch } = useApp();
  const [form, setForm] = useState(isEdit ? { ...transaction } : { ...EMPTY_FORM });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description.trim()) { setError('Description is required.'); return; }
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0) {
      setError('Please enter a valid positive amount.'); return;
    }
    if (!form.date) { setError('Date is required.'); return; }

    if (isEdit) {
      dispatch({ type: 'EDIT_TRANSACTION', payload: form });
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload: form });
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal slide-up">
        <div className="modal-header">
          <h3 className="modal-title">{isEdit ? 'Edit Transaction' : 'Add Transaction'}</h3>
          <button className="btn btn-icon btn-secondary" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: 16,
                color: 'var(--accent-red)', fontSize: '0.82rem',
              }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Description *</label>
              <input
                className="form-control"
                name="description"
                placeholder="e.g. Monthly Rent"
                value={form.description}
                onChange={handleChange}
                maxLength={80}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Amount (₹) *</label>
                <input
                  className="form-control"
                  type="number"
                  name="amount"
                  placeholder="0"
                  min="0"
                  step="1"
                  value={form.amount}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  className="form-control"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-control" name="category" value={form.category} onChange={handleChange}>
                  {Object.keys(CATEGORIES).map(c => (
                    <option key={c} value={c}>{CATEGORIES[c].icon} {c}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select className="form-control" name="type" value={form.type} onChange={handleChange}>
                  <option value="income">💚 Income</option>
                  <option value="expense">❤️ Expense</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
