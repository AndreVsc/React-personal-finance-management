import React from "react";
import "./FinancialSummary.css";
import { ArrowUpRight } from "lucide-react";

const FinancialSummary = () => {
  return (
    <>
      <h2 className="summary-title">Resumo Financeiro</h2>
      
      <div className="summary-card summary-balance">
        <h3 className="summary-card-title">Balanço Mensal</h3>
        <p className="summary-balance-value">+ R$ 200</p>
        <p className="summary-balance-status">
          <ArrowUpRight size={16} className="summary-icon" /> Saldo positivo
        </p>
      </div>
      
      <div className="summary-card summary-savings">
        <h3 className="summary-card-title">Meta de Economia</h3>
        <p className="summary-savings-progress"><strong>16.7% concluída</strong></p>
        <p className="summary-savings-remaining">Faltam R$ 25.000</p>
      </div>
      
      <div className="summary-card summary-investments">
        <h3 className="summary-card-title">Investimentos</h3>
        <p className="summary-investment-amount">R$ 750/mês</p>
        <p className="summary-investment-return">Rendimento projetado: 8.5% a.a.</p>
      </div>
    </>
  );
};

export default FinancialSummary;