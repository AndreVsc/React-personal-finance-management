import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import "./ExpenseTable.css";

export default function ExpenseTable() {
    const { categories, updateCategory, updateSpent, income } = useFinance();
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState("");

    const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
    const balance = income - totalSpent;

    const handleEdit = (index, field, value) => {
        setEditingIndex(index);
        setEditingField(field);
        setTempValue(value.toString());
    };

    const handleSave = () => {
        if (editingIndex !== null && editingField) {
            const value = Number(tempValue);
            if (!isNaN(value) && value >= 0) {
                if (editingField === 'allocation') {
                    updateCategory(editingIndex, { allocation: value, max: (income * value) / 100 });
                } else if (editingField === 'spent') {
                    updateSpent(editingIndex, value);
                }
            }
        }
        setEditingIndex(null);
        setEditingField(null);
    };

    return (
        <>
            <h3 className="expense-table-title">📌 Categorias de Gastos</h3>
            <div className="expense-table-wrapper">
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Categoria</th>
                            <th>Alocação</th>
                            <th>Valor Máx.</th>
                            <th>Gasto Real</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat, index) => {
                            const status = cat.spent > cat.max 
                                ? `⚠️ +${Math.round(((cat.spent - cat.max) / cat.max) * 100)}%` 
                                : "OK";
                            const statusClass = cat.spent > cat.max 
                                ? "expense-table-over-budget" 
                                : "expense-table-ok-status";

                            return (
                                <tr key={cat.name}>
                                    <td>
                                        <span 
                                            className="expense-table-dot" 
                                            style={{ background: cat.color }}
                                        ></span>
                                        {cat.name}
                                    </td>
                                    <td className="expense-table-number">
                                        {editingIndex === index && editingField === 'allocation' ? (
                                            <input
                                                type="number"
                                                value={tempValue}
                                                onChange={(e) => setTempValue(e.target.value)}
                                                onBlur={handleSave}
                                                autoFocus
                                                className="expense-table-input"
                                            />
                                        ) : (
                                            <span 
                                                onClick={() => handleEdit(index, 'allocation', cat.allocation)}
                                                className="expense-table-editable"
                                            >
                                                {cat.allocation}%
                                            </span>
                                        )}
                                    </td>
                                    <td className="expense-table-number">R$ {cat.max.toLocaleString("pt-BR")}</td>
                                    <td className="expense-table-number">
                                        {editingIndex === index && editingField === 'spent' ? (
                                            <input
                                                type="number"
                                                value={tempValue}
                                                onChange={(e) => setTempValue(e.target.value)}
                                                onBlur={handleSave}
                                                autoFocus
                                                className="expense-table-input"
                                            />
                                        ) : (
                                            <span 
                                                onClick={() => handleEdit(index, 'spent', cat.spent)}
                                                className="expense-table-editable"
                                            >
                                                R$ {cat.spent.toLocaleString("pt-BR")}
                                            </span>
                                        )}
                                    </td>
                                    <td className={statusClass}>{status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td className="expense-table-number">100%</td>
                            <td className="expense-table-number">R$ {income.toLocaleString("pt-BR")}</td>
                            <td className="expense-table-number">R$ {totalSpent.toLocaleString("pt-BR")}</td>
                            <td className="expense-table-balance">
                                <span className={`expense-table-balance-amount ${balance < 0 ? 'expense-table-negative' : ''}`}>
                                    R$ {balance.toLocaleString("pt-BR")}
                                </span>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    );
}