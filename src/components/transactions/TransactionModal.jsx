import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { X } from 'lucide-react';

const EMPTY_FORM = {
  date: new Date().toISOString().split('T')[0],
  description: '', amount: '', category: 'Food', type: 'expense', notes: '',
};

export default function TransactionModal({ transaction, onClose }) {
  const isEdit = !!transaction;
  const { dispatch } = useApp();
  const [form,   setForm]   = useState(isEdit ? { ...transaction } : { ...EMPTY_FORM });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.description.trim())                              errs.description = 'Description is required.';
    if (!form.amount || isNaN(form.amount) || +form.amount <= 0) errs.amount = 'Enter a valid positive amount.';
    if (!form.date)                                            errs.date = 'Date is required.';
    return errs;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    dispatch({ type: isEdit ? 'EDIT_TRANSACTION' : 'ADD_TRANSACTION', payload: form });
    onClose();
  };

  const descLen = (form.description || '').length;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal slide-up">
        <div className="modal-header">
          <h3 className="modal-title">{isEdit ? '✏️ Edit Transaction' : '➕ Add Transaction'}</h3>
          <button className="btn btn-icon btn-secondary" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">

            {/* Description */}
            <div className="form-group">
              <label className="form-label">
                Description *
                <span className="char-count">{descLen}/80</span>
              </label>
              <input
                className={`form-control ${errors.description ? 'error' : ''}`}
                name="description"
                placeholder="e.g. Monthly Rent"
                value={form.description}
                onChange={handleChange}
                maxLength={80}
              />
              {errors.description && <p className="field-error">{errors.description}</p>}
            </div>

            <div className="form-row">
              {/* Amount */}
              <div className="form-group">
                <label className="form-label">Amount (₹) *</label>
                <input
                  className={`form-control ${errors.amount ? 'error' : ''}`}
                  type="number" name="amount" placeholder="0" min="0" step="1"
                  value={form.amount} onChange={handleChange}
                />
                {errors.amount && <p className="field-error">{errors.amount}</p>}
              </div>
              {/* Date */}
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  className={`form-control ${errors.date ? 'error' : ''}`}
                  type="date" name="date" value={form.date} onChange={handleChange}
                />
                {errors.date && <p className="field-error">{errors.date}</p>}
              </div>
            </div>

            <div className="form-row">
              {/* Category */}
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-control" name="category" value={form.category} onChange={handleChange}>
                  {Object.keys(CATEGORIES).map(c => (
                    <option key={c} value={c}>{CATEGORIES[c].icon} {c}</option>
                  ))}
                </select>
              </div>
              {/* Type */}
              <div className="form-group">
                <label className="form-label">Type</label>
                <select className="form-control" name="type" value={form.type} onChange={handleChange}>
                  <option value="income">💚 Income</option>
                  <option value="expense">❤️ Expense</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Notes <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
              <textarea
                className="form-control"
                name="notes"
                placeholder="Additional details..."
                value={form.notes || ''}
                onChange={handleChange}
                maxLength={200}
                rows={2}
                style={{ resize: 'vertical', minHeight: 62 }}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? '✓ Save Changes' : '+ Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
