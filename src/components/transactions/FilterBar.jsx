import { Search, SlidersHorizontal, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';

const CATEGORY_OPTIONS = ['All', ...Object.keys(CATEGORIES)];
const TYPE_OPTIONS     = ['All', 'income', 'expense'];
const SORT_OPTIONS     = [
  { value: 'date',     label: 'Date' },
  { value: 'amount',   label: 'Amount' },
  { value: 'category', label: 'Category' },
];

export default function FilterBar() {
  const { state, dispatch } = useApp();
  const { filters } = state;

  const update = (key, value) => dispatch({ type: 'SET_FILTERS', payload: { [key]: value } });
  const reset  = () => dispatch({ type: 'RESET_FILTERS' });

  const hasActive = filters.search || filters.category !== 'All' || filters.type !== 'All' ||
    filters.dateFrom || filters.dateTo || filters.amountMin || filters.amountMax;

  const chips = [
    filters.search     && { label: `"${filters.search}"`,  clear: () => update('search', '') },
    filters.category !== 'All' && { label: filters.category, clear: () => update('category', 'All') },
    filters.type !== 'All'     && { label: filters.type,    clear: () => update('type', 'All') },
    filters.dateFrom   && { label: `From ${filters.dateFrom}`, clear: () => update('dateFrom', '') },
    filters.dateTo     && { label: `To ${filters.dateTo}`,     clear: () => update('dateTo', '') },
    filters.amountMin  && { label: `Min ₹${filters.amountMin}`,  clear: () => update('amountMin', '') },
    filters.amountMax  && { label: `Max ₹${filters.amountMax}`,  clear: () => update('amountMax', '') },
  ].filter(Boolean);

  return (
    <>
      <div className="filter-bar">
        {/* Search */}
        <div className="search-input-wrap" style={{ flex: 2, minWidth: 200 }}>
          <Search size={14} className="search-icon" />
          <input
            className="input"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={e => update('search', e.target.value)}
            id="search-transactions"
          />
        </div>

        {/* Category */}
        <select className="select" value={filters.category} onChange={e => update('category', e.target.value)} id="filter-category">
          {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
        </select>

        {/* Type */}
        <select className="select" value={filters.type} onChange={e => update('type', e.target.value)} id="filter-type">
          {TYPE_OPTIONS.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
        </select>

        {/* Date range */}
        <div className="filter-group">
          <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontWeight: 600 }}>From</label>
          <input type="date" className="input input-sm" value={filters.dateFrom} onChange={e => update('dateFrom', e.target.value)} />
        </div>
        <div className="filter-group">
          <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontWeight: 600 }}>To</label>
          <input type="date" className="input input-sm" value={filters.dateTo} onChange={e => update('dateTo', e.target.value)} />
        </div>

        {/* Amount range */}
        <div className="filter-group">
          <input
            type="number" className="input input-sm" placeholder="Min ₹" min={0}
            style={{ width: 90 }} value={filters.amountMin}
            onChange={e => update('amountMin', e.target.value)}
          />
        </div>
        <div className="filter-group">
          <input
            type="number" className="input input-sm" placeholder="Max ₹" min={0}
            style={{ width: 90 }} value={filters.amountMax}
            onChange={e => update('amountMax', e.target.value)}
          />
        </div>

        {/* Sort */}
        <div className="filter-group" style={{ gap: 6 }}>
          <SlidersHorizontal size={13} style={{ color: 'var(--text-muted)' }} />
          <select
            className="select input-sm"
            value={filters.sortBy}
            onChange={e => update('sortBy', e.target.value)}
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button
            className="btn btn-secondary btn-sm btn-icon"
            style={{ width: 32, height: 32 }}
            onClick={() => update('sortDir', filters.sortDir === 'asc' ? 'desc' : 'asc')}
            title={`Sort ${filters.sortDir === 'asc' ? 'descending' : 'ascending'}`}
          >
            {filters.sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Clear all */}
        {hasActive && (
          <button className="btn btn-secondary btn-sm" onClick={reset} title="Clear all filters">
            <X size={13} /> Clear
          </button>
        )}
      </div>

      {/* Active filter chips */}
      {chips.length > 0 && (
        <div className="filter-chips" style={{ marginBottom: 14 }}>
          {chips.map((chip, i) => (
            <button key={i} className="filter-chip" onClick={chip.clear}>
              {chip.label} <span>×</span>
            </button>
          ))}
          {chips.length > 1 && (
            <button className="filter-chip" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--accent-red)', borderColor: 'rgba(239,68,68,0.2)' }} onClick={reset}>
              Clear all <span>×</span>
            </button>
          )}
        </div>
      )}
    </>
  );
}
