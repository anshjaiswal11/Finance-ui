import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getSummaryStats } from '../../data/mockData';
import './Sidebar.css';

const fmt = v => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

const navItems = [
  { path: '/',             label: 'Dashboard',    icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/insights',     label: 'Insights',     icon: Lightbulb },
];

export default function Sidebar({ open, onClose }) {
  const { state } = useApp();
  const { role, transactions } = state;
  const location = useLocation();
  const stats = getSummaryStats(transactions);

  const currentMonthNet = stats.currentMonthNet;

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon">
            <TrendingUp size={20} />
          </div>
          <div className="logo-text">
            <span className="logo-title">FinanceIO</span>
            <span className="logo-sub">Dashboard</span>
          </div>
          <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <p className="nav-section-label">NAVIGATION</p>
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <Icon size={17} />
              <span>{label}</span>
              {path === '/transactions' && (
                <span className="nav-count-badge">{transactions.length}</span>
              )}
              {path === location.pathname && <span className="nav-active-dot" />}
            </NavLink>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="sidebar-quick-stats">
          <div className="qs-row">
            <span className="qs-label">Total Balance</span>
            <span className="qs-value">{fmt(stats.totalBalance)}</span>
          </div>
          <div className="qs-row">
            <span className="qs-label">This Month Net</span>
            <span className={`qs-value ${currentMonthNet >= 0 ? 'positive' : 'negative'}`}>
              {currentMonthNet >= 0 ? '+' : '−'}{fmt(Math.abs(currentMonthNet))}
            </span>
          </div>
          <div className="qs-row">
            <span className="qs-label">Savings Rate</span>
            <span className={`qs-value ${stats.savingsRate >= 20 ? 'positive' : 'negative'}`}>
              {stats.savingsRate}%
            </span>
          </div>
        </div>

        {/* Role badge */}
        <div className="sidebar-footer">
          <div className="sidebar-role">
            <div className="role-avatar">{role === 'admin' ? '👑' : '👁️'}</div>
            <div>
              <p className="role-name">{role === 'admin' ? 'Administrator' : 'Viewer'}</p>
              <p className="role-access">{role === 'admin' ? 'Full Access' : 'Read Only'}</p>
            </div>
            <span className={`badge badge-${role}`}>{role}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
