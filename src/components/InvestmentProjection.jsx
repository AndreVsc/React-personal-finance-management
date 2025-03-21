import React from "react";
import "./InvestmentProjection.css";
import { TrendingUp } from "lucide-react";

const InvestmentProjection = () => {
  return (
    <>
      <h2 className="title">
        <TrendingUp size={20} className="icon" /> Projeção de Investimentos
      </h2>
      <div className="goal-details">
        <p><strong className="label">Valor Mensal:</strong> <span className="value">R$ 750</span></p>
        <p><strong className="label">Tipo de Investimento:</strong> <span className="value">CDB</span></p>
        <p><strong className="label">Retorno Anual Esperado:</strong> <span className="value">8.5%</span></p>
        <p><strong className="label">Projeção:</strong> <span className="value">5 anos</span></p>
      </div>
      <div className="projection-box">
        <p className="projection-label">Valor projetado em 5 anos:</p>
        <p className="projection-value">R$ 55.832</p>
      </div>
    </>
  );
};

export default InvestmentProjection;
