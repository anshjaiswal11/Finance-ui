# 💰 FinanceIO — Finance Dashboard UI

A clean, interactive, and modern finance dashboard built with **React + Vite** for tracking income, expenses, and financial insights.

---

## 🚀 Quick Start

```bash
# Clone or open the project folder
cd Finance-ui

# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📋 Features

### 1. Dashboard Overview
- **4 Summary Cards** — Total Balance, Total Income, Total Expenses, Savings Rate with trend indicators
- **Balance Trend Chart** — Area chart showing income, expense & balance over 6 months
- **Spending Breakdown** — Donut pie chart by spending category
- **Recent Activity** — Last 6 transactions with category icons

### 2. Transactions Page
- **50+ Mock Transactions** spanning Jan–Jun 2024
- **Search** — real-time text search across description and category
- **Filters** — by category, type (income/expense), and date range
- **Sortable Columns** — click Date, Amount, or Category to sort asc/desc
- **Pagination** — 10 items per page
- **Admin Only**: Add, Edit, Delete transactions via modal form

### 3. Insights Page
- **4 Insight Cards** — Top spending category, average daily spend, most frequent category, best savings month
- **Monthly Comparison Bar Chart** — Income vs Expenses grouped by month
- **Budget Health** — Progress bars per category, color-coded (green/yellow/red)

### 4. Role-Based UI (RBAC Simulation)
| Role | Capabilities |
|------|-------------|
| **Admin** | View all data + Add / Edit / Delete transactions |
| **Viewer** | Read-only view of all data |

Switch roles using the **Role dropdown** in the header. Role persists in **localStorage**.

### 5. Dark / Light Mode
- Toggle using the 🌙 / ☀️ button in the header
- Preference is saved to **localStorage**

### 6. Export CSV
- Click **Export** in the header to download all transactions as a `.csv` file

---

## 🗂️ Project Structure

```
src/
├── context/
│   └── AppContext.jsx        # Global state (role, transactions, filters, dark mode)
├── data/
│   └── mockData.js           # 60+ mock transactions + helper functions
├── components/
│   ├── layout/
│   │   ├── Layout.jsx        # App wrapper
│   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   └── Header.jsx        # Top header with controls
│   ├── dashboard/
│   │   ├── SummaryCards.jsx
│   │   ├── BalanceTrendChart.jsx
│   │   ├── SpendingBreakdownChart.jsx
│   │   └── RecentTransactions.jsx
│   ├── transactions/
│   │   ├── FilterBar.jsx
│   │   ├── TransactionTable.jsx
│   │   └── TransactionModal.jsx
│   └── insights/
│       ├── InsightCards.jsx
│       ├── MonthlyComparisonChart.jsx
│       └── BudgetHealth.jsx
└── pages/
    ├── Dashboard.jsx
    ├── Transactions.jsx
    └── Insights.jsx
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| React Router v6 | Client-side routing |
| Recharts | Charts (Area, Pie, Bar) |
| Lucide React | Icons |
| Vanilla CSS | Styling with CSS Variables |
| React Context + useReducer | State management |
| localStorage | Role & theme persistence |

---

## 🎯 State Management

Uses **React Context + useReducer** pattern:

**Actions:**
- `SET_ROLE` — switch Admin / Viewer
- `TOGGLE_DARK_MODE` — toggle light/dark theme
- `ADD_TRANSACTION` — Admin: add new transaction
- `EDIT_TRANSACTION` — Admin: edit existing transaction
- `DELETE_TRANSACTION` — Admin: remove transaction
- `SET_FILTERS` — update filter/sort state
- `RESET_FILTERS` — clear all filters
- `RESET_TRANSACTIONS` — restore original mock data

---

## 📱 Responsive Design

- **Desktop** (>1100px): Full multi-column layout
- **Tablet** (768–1100px): 2-column cards, stacked charts
- **Mobile** (<768px): Single column, collapsible sidebar via hamburger menu

---

## ✅ Assignment Checklist

- [x] Dashboard with summary cards + 2 chart types
- [x] Transactions list with filtering, search, sorting
- [x] Role-based UI (Admin vs Viewer)
- [x] Insights section with analytics
- [x] State management (Context + useReducer)
- [x] Responsive design
- [x] Dark mode
- [x] localStorage persistence
- [x] Export CSV
- [x] Empty state handling
- [x] Clean, modular code structure
