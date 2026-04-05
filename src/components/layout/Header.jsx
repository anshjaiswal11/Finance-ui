import { useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, Download, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ROLES } from '../../data/mockData';
import './Header.css';

const PAGE_TITLES = {
  '/':             { title: 'Dashboard',     subtitle: 'Welcome back! Here is your financial overview.' },
  '/transactions': { title: 'Transactions',  subtitle: 'Manage and track all your financial records.' },
  '/insights':     { title: 'Insights',      subtitle: 'Understand your spending patterns and trends.' },
};

export default function Header({ onMenuOpen }) {
  const { state, dispatch } = useApp();
  const { role, darkMode, transactions } = state;
  const isAdmin  = role === 'admin';
  const location = useLocation();
  const page     = PAGE_TITLES[location.pathname] || PAGE_TITLES['/'];

  const handleRoleChange = e => dispatch({ type: 'SET_ROLE', payload: e.target.value });

  const handleExport = () => {
    const csv = [
      ['Date', 'Description', 'Category', 'Type', 'Amount', 'Notes'],
      ...transactions.map(t => [t.date, t.description, t.category, t.type, t.amount, t.notes || '']),
    ].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'transactions.csv'; a.click();
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
          <span className="role-avatar-sm">{role === 'admin' ? '👑' : '👁️'}</span>
          <select className="role-select" value={role} onChange={handleRoleChange} id="role-switcher">
            {Object.entries(ROLES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Export */}
        <button className="btn btn-secondary btn-sm header-btn" onClick={handleExport} title="Export CSV">
          <Download size={14} />
          <span className="btn-text">Export</span>
        </button>

        {/* Notification Bell – Admin only */}
        {isAdmin && (
          <div className="notif-wrap" title="3 budget alerts">
            <button className="btn btn-secondary btn-icon">
              <Bell size={17} />
            </button>
            <span className="notif-badge">3</span>
          </div>
        )}

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
