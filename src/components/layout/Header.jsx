import { useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ROLES } from '../../data/mockData';
import './Header.css';

const PAGE_TITLES = {
  '/':             { title: 'Dashboard',     subtitle: 'Welcome back! Here is your financial overview.' },
  '/transactions': { title: 'Transactions',  subtitle: 'Manage and track all your financial transactions.' },
  '/insights':     { title: 'Insights',      subtitle: 'Understand your spending patterns and trends.' },
};

export default function Header({ onMenuOpen }) {
  const { state, dispatch } = useApp();
  const { role, darkMode, transactions } = state;
  const location = useLocation();

  const page = PAGE_TITLES[location.pathname] || PAGE_TITLES['/'];

  const handleRoleChange = (e) => {
    dispatch({ type: 'SET_ROLE', payload: e.target.value });
  };

  const handleExport = () => {
    const csv = [
      ['Date', 'Description', 'Category', 'Type', 'Amount'],
      ...transactions.map(t => [t.date, t.description, t.category, t.type, t.amount]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuOpen} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <div>
          <h1 className="header-title">{page.title}</h1>
          <p className="header-subtitle">{page.subtitle}</p>
        </div>
      </div>

      <div className="header-right">
        {/* Role switcher */}
        <div className="role-switcher">
          <label className="role-label">Role:</label>
          <select
            className="role-select"
            value={role}
            onChange={handleRoleChange}
            id="role-switcher"
          >
            {Object.entries(ROLES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Export */}
        <button className="btn btn-secondary btn-sm header-btn" onClick={handleExport} title="Export CSV">
          <Download size={15} />
          <span className="btn-text">Export</span>
        </button>

        {/* Dark mode toggle */}
        <button
          className="btn btn-secondary btn-icon"
          onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
          aria-label="Toggle dark mode"
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  );
}
