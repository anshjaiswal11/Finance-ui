// Mock financial data for the Finance Dashboard

export const CATEGORIES = {
  Food:          { color: '#FF6B6B', icon: '🍔' },
  Transport:     { color: '#4ECDC4', icon: '🚗' },
  Entertainment: { color: '#45B7D1', icon: '🎬' },
  Utilities:     { color: '#96CEB4', icon: '💡' },
  Health:        { color: '#FFEAA7', icon: '🏥' },
  Shopping:      { color: '#DDA0DD', icon: '🛍️' },
  Salary:        { color: '#55EFC4', icon: '💼' },
  Freelance:     { color: '#74B9FF', icon: '💻' },
  Investment:    { color: '#A29BFE', icon: '📈' },
  Other:         { color: '#FD79A8', icon: '📌' },
};

export const TRANSACTION_TYPES = { income: 'income', expense: 'expense' };
export const ROLES = { admin: 'Admin', viewer: 'Viewer' };

export const DEFAULT_BUDGETS = {
  Food:          12000,
  Transport:      5000,
  Entertainment:  3000,
  Utilities:      5000,
  Health:         4000,
  Shopping:       8000,
  Investment:    60000,
  Other:          3000,
};

export const mockTransactions = [
  // --- January ---
  { id: 1,  date: '2024-01-03', description: 'Monthly Salary',       amount: 85000, category: 'Salary',        type: 'income',  notes: '' },
  { id: 2,  date: '2024-01-05', description: 'Groceries - BigBasket', amount: 3200,  category: 'Food',          type: 'expense', notes: '' },
  { id: 3,  date: '2024-01-07', description: 'Uber Ride',             amount: 450,   category: 'Transport',     type: 'expense', notes: '' },
  { id: 4,  date: '2024-01-10', description: 'Netflix Subscription',  amount: 649,   category: 'Entertainment', type: 'expense', notes: 'Annual plan' },
  { id: 5,  date: '2024-01-12', description: 'Electricity Bill',      amount: 2100,  category: 'Utilities',     type: 'expense', notes: '' },
  { id: 6,  date: '2024-01-15', description: 'Freelance Project',     amount: 15000, category: 'Freelance',     type: 'income',  notes: 'Client: Acme Corp' },
  { id: 7,  date: '2024-01-18', description: 'Doctor Consultation',   amount: 800,   category: 'Health',        type: 'expense', notes: '' },
  { id: 8,  date: '2024-01-20', description: 'Amazon Shopping',       amount: 4500,  category: 'Shopping',      type: 'expense', notes: '' },
  { id: 9,  date: '2024-01-22', description: 'Mutual Fund SIP',       amount: 10000, category: 'Investment',    type: 'expense', notes: 'HDFC Flexi Cap' },
  { id: 10, date: '2024-01-25', description: 'Restaurant Dinner',     amount: 1800,  category: 'Food',          type: 'expense', notes: '' },
  { id: 11, date: '2024-01-28', description: 'Internet Bill',         amount: 999,   category: 'Utilities',     type: 'expense', notes: '' },

  // --- February ---
  { id: 12, date: '2024-02-01', description: 'Monthly Salary',        amount: 85000, category: 'Salary',        type: 'income',  notes: '' },
  { id: 13, date: '2024-02-03', description: 'Swiggy Orders',         amount: 2800,  category: 'Food',          type: 'expense', notes: '' },
  { id: 14, date: '2024-02-05', description: 'Metro Card Recharge',   amount: 500,   category: 'Transport',     type: 'expense', notes: '' },
  { id: 15, date: '2024-02-08', description: 'Spotify Premium',       amount: 119,   category: 'Entertainment', type: 'expense', notes: '' },
  { id: 16, date: '2024-02-10', description: 'Freelance Design',      amount: 20000, category: 'Freelance',     type: 'income',  notes: 'Logo redesign project' },
  { id: 17, date: '2024-02-12', description: 'Pharmacy',              amount: 650,   category: 'Health',        type: 'expense', notes: '' },
  { id: 18, date: '2024-02-14', description: 'Valentine Dinner',      amount: 3500,  category: 'Food',          type: 'expense', notes: '' },
  { id: 19, date: '2024-02-16', description: 'Clothes Shopping',      amount: 5800,  category: 'Shopping',      type: 'expense', notes: '' },
  { id: 20, date: '2024-02-20', description: 'Water Bill',            amount: 350,   category: 'Utilities',     type: 'expense', notes: '' },
  { id: 21, date: '2024-02-22', description: 'Mutual Fund SIP',       amount: 10000, category: 'Investment',    type: 'expense', notes: 'HDFC Flexi Cap' },
  { id: 22, date: '2024-02-25', description: 'Petrol',                amount: 2200,  category: 'Transport',     type: 'expense', notes: '' },

  // --- March ---
  { id: 23, date: '2024-03-01', description: 'Monthly Salary',        amount: 85000, category: 'Salary',        type: 'income',  notes: '' },
  { id: 24, date: '2024-03-04', description: 'Grocery Shopping',      amount: 4100,  category: 'Food',          type: 'expense', notes: '' },
  { id: 25, date: '2024-03-06', description: 'Auto Rickshaw',         amount: 320,   category: 'Transport',     type: 'expense', notes: '' },
  { id: 26, date: '2024-03-08', description: 'Movie Tickets',         amount: 900,   category: 'Entertainment', type: 'expense', notes: '' },
  { id: 27, date: '2024-03-10', description: 'Freelance Web Dev',     amount: 25000, category: 'Freelance',     type: 'income',  notes: 'E-commerce site' },
  { id: 28, date: '2024-03-12', description: 'Gym Membership',        amount: 2500,  category: 'Health',        type: 'expense', notes: '3-month package' },
  { id: 29, date: '2024-03-15', description: 'Holi Shopping',         amount: 1200,  category: 'Shopping',      type: 'expense', notes: '' },
  { id: 30, date: '2024-03-18', description: 'Electricity Bill',      amount: 1900,  category: 'Utilities',     type: 'expense', notes: '' },
  { id: 31, date: '2024-03-20', description: 'Mutual Fund SIP',       amount: 10000, category: 'Investment',    type: 'expense', notes: 'HDFC Flexi Cap' },
  { id: 32, date: '2024-03-22', description: 'Zomato Orders',         amount: 2100,  category: 'Food',          type: 'expense', notes: '' },
  { id: 33, date: '2024-03-25', description: 'Stock Dividend',        amount: 3500,  category: 'Investment',    type: 'income',  notes: 'Infosys Q4 dividend' },
  { id: 34, date: '2024-03-28', description: 'Cab to Airport',        amount: 850,   category: 'Transport',     type: 'expense', notes: '' },

  // --- April ---
  { id: 35, date: '2024-04-01', description: 'Monthly Salary',        amount: 90000, category: 'Salary',        type: 'income',  notes: 'Increment applied' },
  { id: 36, date: '2024-04-03', description: 'Restaurant Lunch',      amount: 1400,  category: 'Food',          type: 'expense', notes: '' },
  { id: 37, date: '2024-04-05', description: 'Bus Pass',              amount: 600,   category: 'Transport',     type: 'expense', notes: '' },
  { id: 38, date: '2024-04-08', description: 'Amazon Prime',          amount: 999,   category: 'Entertainment', type: 'expense', notes: '' },
  { id: 39, date: '2024-04-10', description: 'Freelance Consulting',  amount: 18000, category: 'Freelance',     type: 'income',  notes: 'UX audit' },
  { id: 40, date: '2024-04-12', description: 'Health Checkup',        amount: 1800,  category: 'Health',        type: 'expense', notes: 'Annual full-body checkup' },
  { id: 41, date: '2024-04-15', description: 'Flipkart Big Sale',     amount: 7200,  category: 'Shopping',      type: 'expense', notes: '' },
  { id: 42, date: '2024-04-18', description: 'Gas Bill',              amount: 800,   category: 'Utilities',     type: 'expense', notes: '' },
  { id: 43, date: '2024-04-20', description: 'Mutual Fund SIP',       amount: 10000, category: 'Investment',    type: 'expense', notes: 'HDFC Flexi Cap' },
  { id: 44, date: '2024-04-24', description: 'Groceries Local Market',amount: 2600,  category: 'Food',          type: 'expense', notes: '' },
  { id: 45, date: '2024-04-28', description: 'Bike Service',          amount: 3200,  category: 'Transport',     type: 'expense', notes: '' },

  // --- May ---
  { id: 46, date: '2024-05-01', description: 'Monthly Salary',        amount: 90000, category: 'Salary',        type: 'income',  notes: '' },
  { id: 47, date: '2024-05-03', description: 'Swiggy Weekend Binge',  amount: 3800,  category: 'Food',          type: 'expense', notes: '' },
  { id: 48, date: '2024-05-06', description: 'Ola Ride',              amount: 280,   category: 'Transport',     type: 'expense', notes: '' },
  { id: 49, date: '2024-05-08', description: 'Concert Tickets',       amount: 2500,  category: 'Entertainment', type: 'expense', notes: 'Arijit Singh live' },
  { id: 50, date: '2024-05-10', description: 'Freelance App Dev',     amount: 30000, category: 'Freelance',     type: 'income',  notes: 'React Native app' },
  { id: 51, date: '2024-05-12', description: 'Dentist Visit',         amount: 2200,  category: 'Health',        type: 'expense', notes: '' },
  { id: 52, date: '2024-05-15', description: 'Summer Wardrobe',       amount: 6500,  category: 'Shopping',      type: 'expense', notes: '' },
  { id: 53, date: '2024-05-18', description: 'Internet Bill',         amount: 999,   category: 'Utilities',     type: 'expense', notes: '' },
  { id: 54, date: '2024-05-20', description: 'Mutual Fund SIP',       amount: 10000, category: 'Investment',    type: 'expense', notes: 'HDFC Flexi Cap' },
  { id: 55, date: '2024-05-24', description: 'Street Food',           amount: 950,   category: 'Food',          type: 'expense', notes: '' },
  { id: 56, date: '2024-05-28', description: 'Stock Dividend',        amount: 4200,  category: 'Investment',    type: 'income',  notes: 'TCS dividend' },

  // --- June ---
  { id: 57, date: '2024-06-01', description: 'Monthly Salary',        amount: 90000, category: 'Salary',        type: 'income',  notes: '' },
  { id: 58, date: '2024-06-04', description: 'Grocery & Vegetables',  amount: 3400,  category: 'Food',          type: 'expense', notes: '' },
  { id: 59, date: '2024-06-06', description: 'Train Ticket',          amount: 1200,  category: 'Transport',     type: 'expense', notes: 'Bangalore–Mysore' },
  { id: 60, date: '2024-06-08', description: 'Gaming Subscription',   amount: 500,   category: 'Entertainment', type: 'expense', notes: '' },
  { id: 61, date: '2024-06-10', description: 'Freelance UI Design',   amount: 22000, category: 'Freelance',     type: 'income',  notes: 'Dashboard redesign' },
  { id: 62, date: '2024-06-12', description: 'Yoga Classes',          amount: 3000,  category: 'Health',        type: 'expense', notes: '1 month membership' },
  { id: 63, date: '2024-06-15', description: 'Monsoon Essentials',    amount: 4200,  category: 'Shopping',      type: 'expense', notes: '' },
  { id: 64, date: '2024-06-18', description: 'Electricity Bill',      amount: 2400,  category: 'Utilities',     type: 'expense', notes: '' },
  { id: 65, date: '2024-06-20', description: 'Mutual Fund SIP',       amount: 10000, category: 'Investment',    type: 'expense', notes: 'HDFC Flexi Cap' },
  { id: 66, date: '2024-06-24', description: 'Restaurant Group Lunch',amount: 2800,  category: 'Food',          type: 'expense', notes: 'Team outing' },
  { id: 67, date: '2024-06-28', description: 'Petrol',                amount: 2500,  category: 'Transport',     type: 'expense', notes: '' },
];

export function getMonthlyData(transactions) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month, m) => {
    const monthTxns = transactions.filter(t => {
      const d = new Date(t.date);
      return d.getFullYear() === 2024 && d.getMonth() === m;
    });
    const income  = monthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = monthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { month, income, expense, balance: income - expense };
  });
}

export function getCategoryBreakdown(transactions) {
  const expenses = transactions.filter(t => t.type === 'expense');
  const map = {};
  expenses.forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount; });
  const total = Object.values(map).reduce((s, v) => s + v, 0);
  return Object.entries(map)
    .map(([name, value]) => ({
      name, value,
      color: CATEGORIES[name]?.color || '#ccc',
      percent: total > 0 ? ((value / total) * 100).toFixed(1) : '0',
    }))
    .sort((a, b) => b.value - a.value);
}

export function getIncomeBreakdown(transactions) {
  const incomes = transactions.filter(t => t.type === 'income');
  const map = {};
  incomes.forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount; });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value, color: CATEGORIES[name]?.color || '#ccc' }))
    .sort((a, b) => b.value - a.value);
}

export function getCategoryTrendData(transactions) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const topCategories = ['Food', 'Shopping', 'Entertainment', 'Transport', 'Health'];

  return months.map((month, m) => {
    const row = { month };
    topCategories.forEach(cat => {
      row[cat] = transactions
        .filter(t => {
          const d = new Date(t.date);
          return d.getFullYear() === 2024 && d.getMonth() === m && t.type === 'expense' && t.category === cat;
        })
        .reduce((s, t) => s + t.amount, 0);
    });
    return row;
  });
}

export function getSummaryStats(transactions) {
  const totalIncome  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

  const currentMonth = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getFullYear() === 2024 && d.getMonth() === 5;
  });
  const currentIncome  = currentMonth.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const currentExpense = currentMonth.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const prevMonth = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getFullYear() === 2024 && d.getMonth() === 4;
  });
  const prevExpense = prevMonth.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const prevIncome  = prevMonth.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);

  return {
    totalBalance: balance,
    totalIncome,
    totalExpense,
    savingsRate: parseFloat(savingsRate),
    currentMonthIncome:   currentIncome,
    currentMonthExpense:  currentExpense,
    currentMonthNet:      currentIncome - currentExpense,
    prevMonthExpense:     prevExpense,
    prevMonthIncome:      prevIncome,
    expenseTrend: prevExpense > 0 ? (((currentExpense - prevExpense) / prevExpense) * 100).toFixed(1) : 0,
    incomeTrend:  prevIncome  > 0 ? (((currentIncome  - prevIncome)  / prevIncome)  * 100).toFixed(1) : 0,
  };
}
