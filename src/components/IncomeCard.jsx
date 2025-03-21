import { useState } from "react";
import "./IncomeCard.css";

export default function IncomeCard() {
    const [income, setIncome] = useState(5000);
    const [editing, setEditing] = useState(false);

    return (
        <>
            <div className="income-left">
                <span className="income-icon">$</span>
                <span className="income-label">Renda Mensal</span>
            </div>
            <div className="income-right">
                {editing ? (
                    <input
                        type="income-number"
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                        onBlur={() => setEditing(false)}
                        autoFocus
                        className="income-input"
                    />
                ) : (
                    <span className="income-value" onClick={() => setEditing(true)}>
                        R$ {income.toLocaleString("pt-BR")}
                    </span>
                )}
                <button className="income-edit" onClick={() => setEditing(!editing)}>Editar</button>
            </div>
        </>
    );
}