import InsightCards from '../components/insights/InsightCards';
import MonthlyComparisonChart from '../components/insights/MonthlyComparisonChart';
import BudgetHealth from '../components/insights/BudgetHealth';

export default function Insights() {
  return (
    <div>
      <div className="page-header">
        <h1>Insights</h1>
        <p>Analyze patterns, compare months, and track budget health.</p>
      </div>

      <InsightCards />

      <div className="charts-grid" style={{ marginBottom: 24 }}>
        <MonthlyComparisonChart />
        <BudgetHealth />
      </div>
    </div>
  );
}
