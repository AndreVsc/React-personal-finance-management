import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import "./PurchaseGoal.css";
import { AlertCircle } from "lucide-react";

const PurchaseGoal = () => {
  const { purchaseGoal, setPurchaseGoal, isPurchaseExceedingLimit } = useFinance();
  const [editing, setEditing] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleEdit = (field, value) => {
    setEditing(field);
    setTempValue(typeof value === 'string' ? value : value.toString());
  };

  const handleSave = () => {
    if (editing) {
      let value = tempValue;
      
      // Converter para número se for um campo numérico
      if (['totalValue', 'installments', 'interestRate'].includes(editing)) {
        value = Number(tempValue);
        if (isNaN(value) || value <= 0) {
          setEditing(null);
          return;
        }
      }
      
      setPurchaseGoal({
        ...purchaseGoal,
        [editing]: value
      });
    }
    setEditing(null);
  };

  return (
    <>
      <h2 className="purchase-goal-title">💲 Meta de Compra</h2>
      <div className="purchase-goal-details">
        <p>
          <span className="purchase-goal-label">Produto:</span>{" "}
          {editing === 'product' ? (
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={handleSave}
              autoFocus
              className="purchase-goal-input"
            />
          ) : (
            <span 
              className="purchase-goal-value purchase-goal-editable" 
              onClick={() => handleEdit('product', purchaseGoal.product)}
            >
              {purchaseGoal.product}
            </span>
          )}
        </p>
        <p>
          <span className="purchase-goal-label">Valor Total:</span>{" "}
          {editing === 'totalValue' ? (
            <input
              type="number"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={handleSave}
              autoFocus
              className="purchase-goal-input"
            />
          ) : (
            <span 
              className="purchase-goal-value purchase-goal-editable" 
              onClick={() => handleEdit('totalValue', purchaseGoal.totalValue)}
            >
              R$ {purchaseGoal.totalValue.toLocaleString("pt-BR")}
            </span>
          )}
        </p>
        <p>
          <span className="purchase-goal-label">Método de Pagamento:</span>{" "}
          {editing === 'paymentMethod' ? (
            <select
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={handleSave}
              autoFocus
              className="purchase-goal-select"
            >
              <option value="PIX/Débito">PIX/Débito</option>
              <option value="Crédito">Crédito</option>
            </select>
          ) : (
            <span 
              className="purchase-goal-value purchase-goal-editable" 
              onClick={() => handleEdit('paymentMethod', purchaseGoal.paymentMethod)}
            >
              {purchaseGoal.paymentMethod}
            </span>
          )}
        </p>
        
        {purchaseGoal.paymentMethod === "Crédito" && (
          <>
            <p>
              <span className="purchase-goal-label">Parcelas:</span>{" "}
              {editing === 'installments' ? (
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onBlur={handleSave}
                  autoFocus
                  className="purchase-goal-input"
                />
              ) : (
                <span 
                  className="purchase-goal-value purchase-goal-editable" 
                  onClick={() => handleEdit('installments', purchaseGoal.installments)}
                >
                  {purchaseGoal.installments}x
                </span>
              )}
            </p>
            <p>
              <span className="purchase-goal-label">Taxa de Juros:</span>{" "}
              {editing === 'interestRate' ? (
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onBlur={handleSave}
                  autoFocus
                  className="purchase-goal-input"
                />
              ) : (
                <span 
                  className="purchase-goal-value purchase-goal-editable" 
                  onClick={() => handleEdit('interestRate', purchaseGoal.interestRate)}
                >
                  {purchaseGoal.interestRate}% ao mês
                </span>
              )}
            </p>
            <p>
              <span className="purchase-goal-label">Valor Total com Juros:</span>{" "}
              <span className="purchase-goal-value">
                R$ {purchaseGoal.totalWithInterest.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </p>
            <p>
              <span className="purchase-goal-label">Pagamento Mensal:</span>{" "}
              <span className="purchase-goal-value">
                R$ {purchaseGoal.monthlyPayment.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </p>
          </>
        )}
      </div>
      
      {isPurchaseExceedingLimit() && purchaseGoal.paymentMethod === "Crédito" && (
        <div className="purchase-goal-alert">
          <AlertCircle size={20} className="purchase-goal-icon-alert" />
          <span>
            A parcela mensal excede 10% da sua renda. Considere aumentar o número de parcelas ou buscar outra forma de pagamento.
          </span>
        </div>
      )}
    </>
  );
};

export default PurchaseGoal;