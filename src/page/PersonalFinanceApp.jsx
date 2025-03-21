import './PersonalFinanceApp.css';
import IncomeCard from '../components/IncomeCard';
import ExpenseTable from '../components/ExpenseTable';
import SavingsGoal from '../components/SavingsGoal';
import PurchaseGoal from '../components/PurchaseGoal';
import InvestmentProjection from '../components/InvestmentProjection';
import FinancialSummary from '../components/FinancialSummary';

function PersonalFinanceApp() {
  return (
    <>
      <div className="app-container">
        <h1>Gestão Financeira Pessoal</h1>
        <p className="p-cinza">Simplifique suas finanças e alcance suas metas</p>
      </div>
      <div className="app-income">
        <IncomeCard />
      </div>
      <div className="app-expense">
        <ExpenseTable />
      </div>
      <div className='app-savings'>
        <SavingsGoal/>
      </div>
      <div className='app-purchase'>
        <PurchaseGoal/>
      </div>
      <div className='app-investment'>
        <InvestmentProjection/>
      </div>
      <div className='app-summary'>
        <FinancialSummary/>
      </div>
      <div className="app-footer">
        <p>Desenvolvido por <a href="https://www.github.com/andrevsc">André Victor</a></p>
      </div>
    </>
  )
}

export default PersonalFinanceApp;