import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './Sidebar.css';

const navItems = [
  { path: '/',             label: 'Dashboard',    icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/insights',     label: 'Insights',     icon: Lightbulb },
];

export default function Sidebar({ open, onClose }) {
  const { state } = useApp();
  const { role } = state;
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
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
          <p className="nav-section-label">MENU</p>
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{label}</span>
              {path === location.pathname && <span className="nav-active-dot" />}
            </NavLink>
          ))}
        </nav>

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
