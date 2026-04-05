import InsightCards from '../components/insights/InsightCards';
import MonthlyComparisonChart from '../components/insights/MonthlyComparisonChart';
import BudgetHealth from '../components/insights/BudgetHealth';
import SpendingTrendChart from '../components/insights/SpendingTrendChart';
import IncomeSourceBreakdown from '../components/insights/IncomeSourceBreakdown';

export default function Insights() {
  return (
    <div>
      <div className="page-header">
        <h1>Insights</h1>
        <p>Analyze patterns, compare months, track budget health, and understand income sources.</p>
      </div>

      <InsightCards />

      <div className="charts-grid" style={{ marginBottom: 24 }}>
        <MonthlyComparisonChart />
        <BudgetHealth />
      </div>

      <div className="charts-grid" style={{ marginBottom: 0 }}>
        <SpendingTrendChart />
        <IncomeSourceBreakdown />
      </div>
    </div>
  );
}
