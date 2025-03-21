import { useState } from "react";
import "./ExpenseTable.css";

const categories = [
    { name: "Necessidades", allocation: 50, max: 2500, spent: 2300, color: "#3498db" },
    { name: "Lazer", allocation: 30, max: 1500, spent: 1700, color: "#2ecc71" },
    { name: "Investimentos", allocation: 15, max: 750, spent: 600, color: "#9b59b6" },
    { name: "Emergências", allocation: 5, max: 250, spent: 200, color: "#f1c40f" }
];

export default function ExpenseTable() {
    const totalMax = categories.reduce((sum, cat) => sum + cat.max, 0);
    const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
    const balance = totalMax - totalSpent;

    return (
        <>
            <h3 className="table-title">📌 Categorias de Gastos</h3>
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
                    {categories.map((cat) => {
                        const status = cat.spent > cat.max ? `⚠️ +${Math.round(((cat.spent - cat.max) / cat.max) * 100)}%` : "OK";
                        const statusClass = cat.spent > cat.max ? "over-budget" : "ok-status";
                        return (
                            <tr key={cat.name}>
                                <td><span className="dot" style={{ background: cat.color }}></span>{cat.name}</td>
                                <td>{cat.allocation}%</td>
                                <td>R$ {cat.max.toLocaleString("pt-BR")}</td>
                                <td>{cat.spent}</td>
                                <td className={statusClass}>{status}</td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td>100%</td>
                        <td>R$ {totalMax.toLocaleString("pt-BR")}</td>
                        <td>R$ {totalSpent.toLocaleString("pt-BR")}</td>
                        <td className="balance"><span className="balance-amount">R$ {balance.toLocaleString("pt-BR")}</span></td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}
