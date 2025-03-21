import "./SavingsGoal.css";

export default function SavingsGoal() {
  const totalGoal = 30000;
  const months = 24;
  const savedAmount = 5000;
  const monthlySaving = totalGoal / months;
  const progress = (savedAmount / totalGoal) * 100;

  return (
    <>
      <h3 className="title">🎯 Meta de Economia</h3>
      <div className="goal-details">
        <p><span className="label">Meta Total:</span> <span className="value">R$ {totalGoal.toLocaleString("pt-BR")}</span></p>
      </div>
      <div className="goal-details">
        <p><span className="label">Prazo:</span> <span className="value">{months} meses</span></p>
      </div>
      <div className="goal-details">
        <p><span className="label">Economia Necessária/Mês:</span> <span className="value">R$ {monthlySaving.toLocaleString("pt-BR")}</span ></p>
      </div>
      <div className="goal-details">
        <p><span className="label">Economizado até o momento:</span> <span className="value">R$ {savedAmount.toLocaleString("pt-BR")}</span></p>
      </div>
      <div className="goal-progress">
        <p><span className="label">Progresso:</span></p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">{progress.toFixed(1)}%</span>
      </div>
    </>
  );
}
