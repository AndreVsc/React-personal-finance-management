import React from "react";
import { useFinance } from "../context/FinanceContext";
import "./FinancialSummary.css";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const FinancialSummary = () => {
  const { calculateBalance, savingsGoal, investment } = useFinance();
  const balance = calculateBalance();
  const isPositive = balance > 0;
  const isZero = balance === 0;

  // Calcular progresso da meta de economia
  const savingsProgress = (savingsGoal.savedAmount / savingsGoal.totalGoal) * 100;
  const remainingAmount = savingsGoal.totalGoal - savingsGoal.savedAmount;

  return (
    <>
      <h2 className="financial-summary-title">Resumo Financeiro</h2>

      <div className="financial-summary-card financial-summary-balance">
        <h3 className="financial-summary-card-title">Balanço Mensal</h3>
        <p
          className="financial-summary-balance-value"
          style={{
            color: balance < 0 ? "#EF4444" : "#2e7d32",
          }}
        >
          {balance > 0 ? "+ " : balance === 0 ? "" : "- "}
          R$ {Math.abs(balance).toLocaleString("pt-BR")}
        </p>
        <p className="financial-summary-balance-status">
          {balance > 0 ? (
            <>
              <ArrowUpRight size={16} className="financial-summary-icon positive" /> Saldo positivo
            </>
          ) : balance === 0 ? (
            <>
              <ArrowUpRight size={16} className="financial-summary-icon positive" /> Saldo zerado
            </>
          ) : (
            <>
              <ArrowDownRight color="#EF4444" size={16} className="financial-summary-icon negative" />
              <span style={{ color: "#EF4444" }}>Saldo negativo</span>
            </>
          )}
        </p>
      </div>

      <div className="financial-summary-card financial-summary-savings">
        <h3 className="financial-summary-card-title">Meta de Economia</h3>
        <p className="financial-summary-savings-progress">
          <strong>{savingsProgress.toFixed(1)}% concluída</strong>
        </p>
        <p className="financial-summary-savings-remaining">
          Faltam R$ {remainingAmount.toLocaleString("pt-BR")}
        </p>
      </div>

      <div className="financial-summary-card financial-summary-investments">
        <h3 className="financial-summary-card-title">Investimentos</h3>
        <p className="financial-summary-investment-amount">
          R$ {investment.monthlyAmount.toLocaleString("pt-BR")}/mês
        </p>
        <p className="financial-summary-investment-return">
          Rendimento projetado: {investment.annualReturn}% a.a.
        </p>
      </div>
    </>
  );
};

export default FinancialSummary;