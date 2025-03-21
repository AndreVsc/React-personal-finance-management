import React from "react";
import "./PurchaseGoal.css";
import { AlertCircle } from "lucide-react";

const PurchaseGoal = () => {
  return (
    <>
      <h2 className="goal-title">💲 Meta de Compra</h2>
      <div className="goal-details">
        <p><span className="label">Produto:</span> <span className="goal-value">Notebook</span></p>
        <p><span className="label">Valor Total:</span> <span className="goal-value">R$ 5.000</span></p>
        <p><span className="label">Método de Pagamento:</span> <span className="goal-value">Crédito</span></p>
        <p><span className="label">Parcelas:</span> <span className="goal-value">10x</span></p>
        <p><span className="label">Taxa de Juros:</span> <span className="goal-value">1.5% ao mês</span></p>
        <p><span className="label">Valor Total com Juros:</span> <span className="goal-value">R$ 5.802,7</span></p>
        <p><span className="label">Pagamento Mensal:</span> <span className="goal-value">R$ 580,27</span></p>
      </div>
      <div className="goal-alert">
        <AlertCircle size={20} className="goal-icon-alert" />
        <span>
          A parcela mensal excede 10% da sua renda. Considere aumentar o número de parcelas ou buscar outra forma de pagamento.
        </span>
      </div>
    </>
  );
};

export default PurchaseGoal;
