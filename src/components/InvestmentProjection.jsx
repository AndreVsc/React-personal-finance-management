import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import "./InvestmentProjection.css";
import { TrendingUp } from "lucide-react";

const InvestmentProjection = () => {
  const { investment, setInvestment } = useFinance();
  const [editing, setEditing] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleEdit = (field, value) => {
    setEditing(field);
    setTempValue(value.toString());
  };

  const handleSave = () => {
    if (editing) {
      setInvestment({
        ...investment,
        [editing]: isNaN(tempValue) ? tempValue : parseFloat(tempValue),
      });
      setEditing(null);
      setTempValue("");
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setTempValue("");
  };

  return (
    <>
      <h2 className="investment-projection-title">
        <TrendingUp size={20} className="investment-projection-icon" /> Projeção de Investimentos
      </h2>
      <div className="investment-projection-details">
        <p>
          <strong className="investment-projection-label">Valor Mensal:</strong>{" "}
          {editing === "monthlyAmount" ? (
            <>
              <input
                type="number"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="investment-projection-input"
              />
              <button onClick={handleSave} className="investment-projection-save">Salvar</button>
              <button onClick={handleCancel} className="investment-projection-cancel">Cancelar</button>
            </>
          ) : (
            <span
              className="investment-projection-value"
              onClick={() => handleEdit("monthlyAmount", investment.monthlyAmount)}
            >
              R$ {investment.monthlyAmount.toLocaleString("pt-BR")}
            </span>
          )}
        </p>
        <p>
          <strong className="investment-projection-label">Tipo de Investimento:</strong>{" "}
          {editing === "investmentType" ? (
            <>
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="investment-projection-input"
              />
              <button onClick={handleSave} className="investment-projection-save">Salvar</button>
              <button onClick={handleCancel} className="investment-projection-cancel">Cancelar</button>
            </>
          ) : (
            <span
              className="investment-projection-value"
              onClick={() => handleEdit("investmentType", investment.investmentType)}
            >
              {investment.investmentType}
            </span>
          )}
        </p>
        <p>
          <strong className="investment-projection-label">Retorno Anual Esperado:</strong>{" "}
          {editing === "annualReturn" ? (
            <>
              <input
                type="number"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="investment-projection-input"
              />
              <button onClick={handleSave} className="investment-projection-save">Salvar</button>
              <button onClick={handleCancel} className="investment-projection-cancel">Cancelar</button>
            </>
          ) : (
            <span
              className="investment-projection-value"
              onClick={() => handleEdit("annualReturn", investment.annualReturn)}
            >
              {investment.annualReturn}%
            </span>
          )}
        </p>
        <p>
          <strong className="investment-projection-label">Projeção:</strong>{" "}
          {editing === "projectionYears" ? (
            <>
              <input
                type="number"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="investment-projection-input"
              />
              <button onClick={handleSave} className="investment-projection-save">Salvar</button>
              <button onClick={handleCancel} className="investment-projection-cancel">Cancelar</button>
            </>
          ) : (
            <span
              className="investment-projection-value"
              onClick={() => handleEdit("projectionYears", investment.projectionYears)}
            >
              {investment.projectionYears} anos
            </span>
          )}
        </p>
      </div>
      <div className="investment-projection-box">
        <p className="investment-projection-box-label">
          Valor projetado em {investment.projectionYears} anos:
        </p>
        <p className="investment-projection-box-value">
          R$ {investment.projectedValue.toLocaleString("pt-BR")}
        </p>
      </div>
    </>
  );
};

export default InvestmentProjection;