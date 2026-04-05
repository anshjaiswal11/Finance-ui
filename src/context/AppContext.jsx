import { createContext, useContext, useReducer, useEffect } from 'react';
import { mockTransactions } from '../data/mockData';

const getInitialState = () => {
  const savedRole = localStorage.getItem('fin_role') || 'viewer';
  const savedDark = localStorage.getItem('fin_dark') === 'true';
  const savedTxns = localStorage.getItem('fin_transactions');
  const transactions = savedTxns ? JSON.parse(savedTxns) : mockTransactions;

  return {
    role: savedRole,              // 'admin' | 'viewer'
    transactions,
    darkMode: savedDark,
    filters: {
      search: '',
      category: 'All',
      type: 'All',               // 'All' | 'income' | 'expense'
      dateFrom: '',
      dateTo: '',
      sortBy: 'date',            // 'date' | 'amount' | 'category'
      sortDir: 'desc',           // 'asc' | 'desc'
    },
    currentPage: 1,
  };
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };

    case 'ADD_TRANSACTION': {
      const newTxn = {
        ...action.payload,
        id: Date.now(),
        amount: parseFloat(action.payload.amount),
      };
      return { ...state, transactions: [newTxn, ...state.transactions] };
    }

    case 'EDIT_TRANSACTION': {
      const updated = state.transactions.map(t =>
        t.id === action.payload.id
          ? { ...action.payload, amount: parseFloat(action.payload.amount) }
          : t
      );
      return { ...state, transactions: updated };
    }

    case 'DELETE_TRANSACTION': {
      const filtered = state.transactions.filter(t => t.id !== action.payload);
      return { ...state, transactions: filtered };
    }

    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload }, currentPage: 1 };

    case 'RESET_FILTERS':
      return {
        ...state,
        filters: {
          search: '',
          category: 'All',
          type: 'All',
          dateFrom: '',
          dateTo: '',
          sortBy: 'date',
          sortDir: 'desc',
        },
        currentPage: 1,
      };

    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };

    case 'RESET_TRANSACTIONS':
      return { ...state, transactions: mockTransactions };

    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, undefined, getInitialState);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('fin_role', state.role);
  }, [state.role]);

  useEffect(() => {
    localStorage.setItem('fin_dark', state.darkMode);
  }, [state.darkMode]);

  useEffect(() => {
    localStorage.setItem('fin_transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  // Apply dark mode class to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
