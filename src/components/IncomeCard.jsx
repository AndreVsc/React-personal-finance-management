import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import "./IncomeCard.css";

export default function IncomeCard() {
    const { income, setIncome } = useFinance();
    const [editing, setEditing] = useState(false);
    const [tempIncome, setTempIncome] = useState(income);

    const handleSave = () => {
        setIncome(tempIncome);
        setEditing(false);
    };

    return (
        <>
            <div className="income-card-left">
                <span className="income-card-icon">$</span>
                <span className="income-card-label">Renda Mensal</span>
            </div>
            <div className="income-card-right">
                {editing ? (
                    <>
                        <input
                            type="number"
                            value={tempIncome}
                            onChange={(e) => setTempIncome(Number(e.target.value))}
                            className="income-card-input"
                            autoFocus
                        />
                        <button className="income-card-edit" onClick={handleSave}>Salvar</button>
                    </>
                ) : (
                    <>
                        <span className="income-card-value" onClick={() => {
                            setTempIncome(income);
                            setEditing(true);
                        }}>
                            R$ {income.toLocaleString("pt-BR")}
                        </span>
                        <button className="income-card-edit" onClick={() => {
                            setTempIncome(income);
                            setEditing(true);
                        }}>Editar</button>
                    </>
                )}
            </div>
        </>
    );
}