import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import "./SavingsGoal.css";

export default function SavingsGoal() {
  const { savingsGoal, setSavingsGoal } = useFinance();
  const [editing, setEditing] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const { totalGoal, months, savedAmount } = savingsGoal;
  const monthlySaving = totalGoal / months;
  const progress = (savedAmount / totalGoal) * 100;

  const handleEdit = (field, value) => {
    setEditing(field);
    setTempValue(value.toString());
  };

  const handleSave = () => {
    if (editing) {
      const value = Number(tempValue);
      if (!isNaN(value) && value > 0) {
        setSavingsGoal({
          ...savingsGoal,
          [editing]: value
        });
      }
    }
    setEditing(null);
  };

  return (
    <>
      <h3 className="savings-goal-title">🎯 Meta de Economia</h3>
      <div className="savings-goal-details">
        <p>
          <span className="savings-goal-label">Meta Total:</span>{" "}
          {editing === 'totalGoal' ? (
            <input
              type="number"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={handleSave}
              autoFocus
              className="savings-goal-input"
            />
          ) : (
            <span 
              className="savings-goal-value savings-goal-editable" 
              onClick={() => handleEdit('totalGoal', totalGoal)}
            >
              R$ {totalGoal.toLocaleString("pt-BR")}
            </span>
          )}
        </p>
      </div>
      <div className="savings-goal-details">
        <p>
          <span className="savings-goal-label">Prazo:</span>{" "}
          {editing === 'months' ? (
            <input
              type="number"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={handleSave}
              autoFocus
              className="savings-goal-input"
            />
          ) : (
            <span 
              className="savings-goal-value savings-goal-editable" 
              onClick={() => handleEdit('months', months)}
            >
              {months} meses
            </span>
          )}
        </p>
      </div>
      <div className="savings-goal-details">
        <p>
          <span className="savings-goal-label">Economia Necessária/Mês:</span>{" "}
          <span className="savings-goal-value">
            R$ {monthlySaving.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </span>
        </p>
      </div>
      <div className="savings-goal-details">
        <p>
          <span className="savings-goal-label">Economizado até o momento:</span>{" "}
          {editing === 'savedAmount' ? (
            <input
              type="number"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={handleSave}
              autoFocus
              className="savings-goal-input"
            />
          ) : (
            <span 
              className="savings-goal-value savings-goal-editable" 
              onClick={() => handleEdit('savedAmount', savedAmount)}
            >
              R$ {savedAmount.toLocaleString("pt-BR")}
            </span>
          )}
        </p>
        <p>
          <span className="savings-goal-label">Progresso:</span>
        </p>
      </div>
      <div className="savings-goal-progress">
        <div className="savings-goal-progress-bar">
          <div 
            className="savings-goal-progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="savings-goal-progress-text">{progress.toFixed(1)}%</span>
      </div>
    </>
  );
}