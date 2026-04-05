import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';

const CATEGORY_OPTIONS = ['All', ...Object.keys(CATEGORIES)];
const TYPE_OPTIONS = ['All', 'income', 'expense'];

export default function FilterBar() {
  const { state, dispatch } = useApp();
  const { filters } = state;

  const update = (key, value) => dispatch({ type: 'SET_FILTERS', payload: { [key]: value } });

  const hasActiveFilters =
    filters.search || filters.category !== 'All' || filters.type !== 'All' ||
    filters.dateFrom || filters.dateTo;

  return (
    <div className="filter-bar">
      {/* Search */}
      <div className="search-input-wrap" style={{ flex: 2, minWidth: 200 }}>
        <Search size={15} className="search-icon" />
        <input
          className="input"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={e => update('search', e.target.value)}
          id="search-transactions"
        />
      </div>

      {/* Category */}
      <select
        className="select"
        value={filters.category}
        onChange={e => update('category', e.target.value)}
        id="filter-category"
      >
        {CATEGORY_OPTIONS.map(c => (
          <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
        ))}
      </select>

      {/* Type */}
      <select
        className="select"
        value={filters.type}
        onChange={e => update('type', e.target.value)}
        id="filter-type"
      >
        {TYPE_OPTIONS.map(t => (
          <option key={t} value={t}>{t === 'All' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}</option>
        ))}
      </select>

      {/* Date range */}
      <div className="filter-group">
        <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>From:</label>
        <input
          type="date"
          className="input"
          value={filters.dateFrom}
          onChange={e => update('dateFrom', e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>To:</label>
        <input
          type="date"
          className="input"
          value={filters.dateTo}
          onChange={e => update('dateTo', e.target.value)}
        />
      </div>

      {/* Clear */}
      {hasActiveFilters && (
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => dispatch({ type: 'RESET_FILTERS' })}
          title="Clear all filters"
        >
          <X size={14} />
          Clear
        </button>
      )}
    </div>
  );
}
