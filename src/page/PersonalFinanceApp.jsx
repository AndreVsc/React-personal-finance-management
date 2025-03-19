import React, { useState, useEffect } from 'react';
import { AlertCircle, DollarSign, TrendingUp, Target, PieChart, AlertTriangle, ArrowUp, ArrowDown, Edit } from 'lucide-react';

const PersonalFinanceApp = () => {
  // Initial state
  const [income, setIncome] = useState(5000);
  const [editingIncome, setEditingIncome] = useState(false);
  const [tempIncome, setTempIncome] = useState(income);
  
  // Categories with default allocations
  const [categories, setCategories] = useState([
    { name: 'Necessidades', percentage: 50, maxValue: income * 0.5, actualSpent: 2300, color: 'bg-blue-500' },
    { name: 'Lazer', percentage: 30, maxValue: income * 0.3, actualSpent: 1700, color: 'bg-green-500' },
    { name: 'Investimentos', percentage: 15, maxValue: income * 0.15, actualSpent: 600, color: 'bg-purple-500' },
    { name: 'Emergências', percentage: 5, maxValue: income * 0.05, actualSpent: 200, color: 'bg-yellow-500' }
  ]);
  
  // Savings goal
  const [savingsGoal, setSavingsGoal] = useState({
    targetAmount: 30000,
    timeframeMonths: 24,
    currentSaved: 5000,
    monthlyRequired: 30000 / 24
  });
  
  const [editingSavingsGoal, setEditingSavingsGoal] = useState(false);
  const [tempSavingsGoal, setTempSavingsGoal] = useState({...savingsGoal});
  
  // Product purchase goal
  const [purchaseGoal, setPurchaseGoal] = useState({
    productName: 'Notebook',
    totalCost: 5000,
    paymentMethod: 'credit',
    installments: 10,
    interestRate: 1.5,
    monthlyPayment: 0,
    totalWithInterest: 0
  });
  
  const [editingPurchaseGoal, setEditingPurchaseGoal] = useState(false);
  const [tempPurchaseGoal, setTempPurchaseGoal] = useState({...purchaseGoal});
  
  // Investment projection
  const [investment, setInvestment] = useState({
    monthlyAmount: 750,
    type: 'CDB',
    expectedAnnualReturn: 8.5,
    projectedYears: 5
  });
  
  const [editingInvestment, setEditingInvestment] = useState(false);
  const [tempInvestment, setTempInvestment] = useState({...investment});
  
  // Time intervals for projection display (in months)
  const projectionIntervals = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60];

  // Calculate values when income changes
  useEffect(() => {
    // Update category max values
    const updatedCategories = categories.map(cat => ({
      ...cat,
      maxValue: (income * cat.percentage / 100)
    }));
    setCategories(updatedCategories);
    
    // Update savings goal monthly requirement
    setSavingsGoal(prev => ({
      ...prev,
      monthlyRequired: (prev.targetAmount - prev.currentSaved) / prev.timeframeMonths
    }));
    
    // Update purchase goal calculations
    calculatePurchaseGoal();
  }, [income]);
  
  // Calculate purchase goal details
  const calculatePurchaseGoal = () => {
    const { totalCost, installments, interestRate, paymentMethod } = purchaseGoal;
    
    if (paymentMethod === 'credit' && installments > 1) {
      // Simple compound interest calculation for installments
      const totalWithInterest = totalCost * Math.pow(1 + (interestRate / 100), installments);
      const monthlyPayment = totalWithInterest / installments;
      
      setPurchaseGoal(prev => ({
        ...prev,
        totalWithInterest,
        monthlyPayment
      }));
    } else {
      setPurchaseGoal(prev => ({
        ...prev,
        totalWithInterest: totalCost,
        monthlyPayment: totalCost / (installments || 1)
      }));
    }
  };
  
  // Handle income update
  const handleIncomeUpdate = () => {
    setIncome(parseFloat(tempIncome));
    setEditingIncome(false);
  };
  
  // Handle category spending update
  const handleSpendingUpdate = (index, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index].actualSpent = parseFloat(value);
    setCategories(updatedCategories);
  };
  
  // Handle savings goal update
  const handleSavingsGoalUpdate = () => {
    const updatedGoal = {
      ...tempSavingsGoal,
      monthlyRequired: (tempSavingsGoal.targetAmount - tempSavingsGoal.currentSaved) / tempSavingsGoal.timeframeMonths
    };
    setSavingsGoal(updatedGoal);
    setEditingSavingsGoal(false);
  };
  
  // Handle purchase goal update
  const handlePurchaseGoalUpdate = () => {
    setPurchaseGoal(tempPurchaseGoal);
    setEditingPurchaseGoal(false);
    
    // Recalculate after update
    setTimeout(() => calculatePurchaseGoal(), 0);
  };
  
  // Handle investment update
  const handleInvestmentUpdate = () => {
    setInvestment(tempInvestment);
    setEditingInvestment(false);
  };
  
  // Calculate total spending
  const totalSpent = categories.reduce((sum, cat) => sum + cat.actualSpent, 0);
  
  // Calculate remaining balance
  const remainingBalance = income - totalSpent;
  
  // Calculate if savings goal is on track
  const isSavingsOnTrack = savingsGoal.currentSaved >= 
    (savingsGoal.targetAmount * (savingsGoal.timeframeMonths - savingsGoal.timeframeMonths) / savingsGoal.timeframeMonths);
  
  // Calculate if purchase installment is too high (> 10% of income)
  const isPurchaseInstallmentTooHigh = purchaseGoal.monthlyPayment > (income * 0.1);
  
  // Calculate investment projection
  const generateInvestmentProjection = () => {
    const { monthlyAmount, expectedAnnualReturn, projectedYears } = investment;
    const monthlyRate = expectedAnnualReturn / 100 / 12;
    
    let total = 0;
    const projection = [];
    
    // Generate data for specific intervals
    for (let month = 1; month <= projectedYears * 12; month++) {
      total = total * (1 + monthlyRate) + monthlyAmount;
      
      if (projectionIntervals.includes(month)) {
        projection.push({
          month,
          year: (month / 12).toFixed(1),
          value: Math.round(total)
        });
      }
    }
    
    return projection;
  };
  
  const investmentProjection = generateInvestmentProjection();

  // Calculate some financial statistics
  const savingsRate = ((income - totalSpent) / income * 100).toFixed(1);
  const monthsTillPurchase = purchaseGoal.totalCost / (income - totalSpent);
  const yearlyInvestmentReturn = investment.monthlyAmount * 12 * (investment.expectedAnnualReturn / 100);
  const netWorthChange = remainingBalance + yearlyInvestmentReturn / 12;
  
  return (
    <div className="flex flex-col p-4 bg-gray-50 min-h-screen text-gray-800 relative">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-blue-700">Gestão Financeira Pessoal</h1>
        <p className="text-gray-600">Simplifique suas finanças e alcance suas metas</p>
      </div>
      
      {/* Income Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <DollarSign className="text-green-500 mr-2" />
            <h2 className="text-xl font-semibold">Renda Mensal</h2>
          </div>
          
          {editingIncome ? (
            <div className="flex items-center">
              <input
                type="number"
                value={tempIncome}
                onChange={(e) => setTempIncome(e.target.value)}
                className="border rounded p-2 w-32 mr-2"
              />
              <button 
                onClick={handleIncomeUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="text-2xl font-bold text-green-600 mr-4">R$ {income.toLocaleString('pt-BR')}</span>
              <button 
                onClick={() => setEditingIncome(true)}
                className="bg-gray-200 px-3 py-1 rounded text-sm"
              >
                Editar
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Budget Categories */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <PieChart className="text-blue-500 mr-2" />
          Categorias de Gastos
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Categoria</th>
                <th className="text-center py-2">Alocação</th>
                <th className="text-center py-2">Valor Máx.</th>
                <th className="text-center py-2">Gasto Real</th>
                <th className="text-center py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => {
                const isOverBudget = category.actualSpent > category.maxValue;
                
                return (
                  <tr key={index} className="border-b">
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
                        {category.name}
                      </div>
                    </td>
                    <td className="text-center py-3">{category.percentage}%</td>
                    <td className="text-center py-3">R$ {category.maxValue.toLocaleString('pt-BR', {maximumFractionDigits: 0})}</td>
                    <td className="text-center py-3">
                      <input
                        type="number"
                        value={category.actualSpent}
                        onChange={(e) => handleSpendingUpdate(index, e.target.value)}
                        className="border rounded p-1 w-24 text-center"
                      />
                    </td>
                    <td className="text-center py-3">
                      {isOverBudget ? (
                        <div className="flex items-center justify-center text-red-500">
                          <AlertTriangle size={16} className="mr-1" />
                          <span>+{(((category.actualSpent / category.maxValue) - 1) * 100).toFixed(0)}%</span>
                        </div>
                      ) : (
                        <div className="text-green-500">OK</div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td className="py-3">Total</td>
                <td className="text-center py-3">100%</td>
                <td className="text-center py-3">R$ {income.toLocaleString('pt-BR')}</td>
                <td className="text-center py-3">R$ {totalSpent.toLocaleString('pt-BR')}</td>
                <td className="text-center py-3">
                  <span className={remainingBalance >= 0 ? "text-green-500" : "text-red-500"}>
                    {remainingBalance >= 0 ? "Saldo: " : "Déficit: "}
                    R$ {Math.abs(remainingBalance).toLocaleString('pt-BR')}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        {/* Bar Chart */}
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Orçado vs. Realizado</h3>
          <div className="flex h-64 items-end space-x-2">
            {categories.map((category, index) => {
              // Calculate the heights based on percentage of income
              const maxHeightPercentage = 80; // Maximum height as percentage of container
              const plannedPercentage = Math.min(maxHeightPercentage, (category.maxValue / income) * 100);
              const actualPercentage = Math.min(maxHeightPercentage, (category.actualSpent / income) * 100);
              const isOverBudget = category.actualSpent > category.maxValue;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex justify-center space-x-2">
                    <div className="relative flex flex-col items-center">
                      <div 
                        className="w-8 bg-gray-200 rounded-t"
                        style={{ height: `${plannedPercentage}%` }}
                      ></div>
                      <span className="text-xs mt-2">Orçado</span>
                    </div>
                    
                    <div className="relative flex flex-col items-center">
                      <div 
                        className={`w-8 ${isOverBudget ? 'bg-red-500' : category.color.replace('bg-', 'bg-')} rounded-t`}
                        style={{ height: `${actualPercentage}%` }}
                      ></div>
                      <span className="text-xs mt-2">Real</span>
                    </div>
                  </div>
                  <span className="text-xs font-medium mt-1">{category.name}</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 bg-gray-200 mr-1"></div>
              <span className="text-xs">Orçado</span>
            </div>
            {categories.map((category, index) => (
              <div key={index} className="flex items-center mr-4">
                <div className={`w-3 h-3 ${category.color} mr-1`}></div>
                <span className="text-xs">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Goals Section */}
      <div className="flex flex-wrap -mx-2">
        {/* Savings Goal */}
        <div className="w-full md:w-1/2 px-2 mb-4">
          <div className="bg-white rounded-lg shadow p-4 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Target className="text-blue-500 mr-2" />
                Meta de Economia
              </h2>
              <button 
                onClick={() => {
                  setTempSavingsGoal({...savingsGoal});
                  setEditingSavingsGoal(true);
                }}
                className="flex items-center text-blue-500"
              >
                <Edit size={16} className="mr-1" />
                <span className="text-sm">Editar</span>
              </button>
            </div>
            
            {editingSavingsGoal ? (
              <div className="mb-4">
                <div className="mb-2">
                  <label className="block text-sm mb-1">Meta Total (R$)</label>
                  <input
                    type="number"
                    value={tempSavingsGoal.targetAmount}
                    onChange={(e) => setTempSavingsGoal({...tempSavingsGoal, targetAmount: parseFloat(e.target.value)})}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Prazo (meses)</label>
                  <input
                    type="number"
                    value={tempSavingsGoal.timeframeMonths}
                    onChange={(e) => setTempSavingsGoal({...tempSavingsGoal, timeframeMonths: parseInt(e.target.value)})}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Economizado até o momento (R$)</label>
                  <input
                    type="number"
                    value={tempSavingsGoal.currentSaved}
                    onChange={(e) => setTempSavingsGoal({...tempSavingsGoal, currentSaved: parseFloat(e.target.value)})}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <button 
                  onClick={handleSavingsGoalUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-2"
                >
                  Salvar
                </button>
              </div>
            ) : (
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>Meta Total:</span>
                  <span className="font-medium">R$ {savingsGoal.targetAmount.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Prazo:</span>
                  <span className="font-medium">{savingsGoal.timeframeMonths} meses</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Economia Necessária/Mês:</span>
                  <span className="font-medium">R$ {savingsGoal.monthlyRequired.toLocaleString('pt-BR', {maximumFractionDigits: 0})}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Economizado até o momento:</span>
                  <span className="font-medium">R$ {savingsGoal.currentSaved.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            )}
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progresso:</span>
                <span>{((savingsGoal.currentSaved / savingsGoal.targetAmount) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(savingsGoal.currentSaved / savingsGoal.targetAmount) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Status Alert */}
            {!isSavingsOnTrack && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 flex items-start">
                <AlertCircle className="text-yellow-500 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-yellow-700">
                    Você está abaixo da economia mensal necessária. Considere reduzir gastos em Lazer para aumentar sua economia.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Purchase Goal */}
        <div className="w-full md:w-1/2 px-2 mb-4">
          <div className="bg-white rounded-lg shadow p-4 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <DollarSign className="text-blue-500 mr-2" />
                Meta de Compra
              </h2>
              <button 
                onClick={() => {
                  setTempPurchaseGoal({...purchaseGoal});
                  setEditingPurchaseGoal(true);
                }}
                className="flex items-center text-blue-500"
              >
                <Edit size={16} className="mr-1" />
                <span className="text-sm">Editar</span>
              </button>
            </div>
            
            {editingPurchaseGoal ? (
              <div className="mb-4">
                <div className="mb-2">
                  <label className="block text-sm mb-1">Produto</label>
                  <input
                    type="text"
                    value={tempPurchaseGoal.productName}
                    onChange={(e) => setTempPurchaseGoal({...tempPurchaseGoal, productName: e.target.value})}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Valor Total (R$)</label>
                  <input
                    type="number"
                    value={tempPurchaseGoal.totalCost}
                    onChange={(e) => setTempPurchaseGoal({...tempPurchaseGoal, totalCost: parseFloat(e.target.value)})}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Método de Pagamento</label>
                  <select
                    value={tempPurchaseGoal.paymentMethod}
                    onChange={(e) => setTempPurchaseGoal({...tempPurchaseGoal, paymentMethod: e.target.value})}
                    className="border rounded p-2 w-full"
                  >
                    <option value="pix">PIX/Débito</option>
                    <option value="credit">Crédito</option>
                  </select>
                </div>
                
                {tempPurchaseGoal.paymentMethod === 'credit' && (
                  <>
                    <div className="mb-2">
                      <label className="block text-sm mb-1">Parcelas</label>
                      <select
                        value={tempPurchaseGoal.installments}
                        onChange={(e) => setTempPurchaseGoal({...tempPurchaseGoal, installments: parseInt(e.target.value)})}
                        className="border rounded p-2 w-full"
                      >
                        {[...Array(24)].map((_, i) => (
                          <option key={i+1} value={i+1}>{i+1}x</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm mb-1">Taxa de Juros Mensal (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={tempPurchaseGoal.interestRate}
                        onChange={(e) => setTempPurchaseGoal({...tempPurchaseGoal, interestRate: parseFloat(e.target.value)})}
                        className="border rounded p-2 w-full"
                      />
                    </div>
                  </>
                )}
                
                <button 
                  onClick={handlePurchaseGoalUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-2"
                >
                  Salvar
                </button>
              </div>
            ) : (
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>Produto:</span>
                  <span className="font-medium">{purchaseGoal.productName}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Valor Total:</span>
                  <span className="font-medium">R$ {purchaseGoal.totalCost.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Método de Pagamento:</span>
                  <span className="font-medium capitalize">{purchaseGoal.paymentMethod === 'credit' ? 'Crédito' : 'PIX/Débito'}</span>
                </div>
                
                {purchaseGoal.paymentMethod === 'credit' && (
                  <>
                    <div className="flex justify-between mb-1">
                      <span>Parcelas:</span>
                      <span className="font-medium">{purchaseGoal.installments}x</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Taxa de Juros:</span>
                      <span className="font-medium">{purchaseGoal.interestRate}% ao mês</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Valor Total com Juros:</span>
                      <span className="font-medium">R$ {purchaseGoal.totalWithInterest.toLocaleString('pt-BR', {maximumFractionDigits: 2})}</span>
                    </div>
                  </>
                )}
                
                <div className="flex justify-between mb-2">
                  <span>Pagamento Mensal:</span>
                  <span className="font-medium">R$ {purchaseGoal.monthlyPayment.toLocaleString('pt-BR', {maximumFractionDigits: 2})}</span>
                </div>
              </div>
            )}
            
            {/* Warning if installment is too high */}
            {isPurchaseInstallmentTooHigh && (
              <div className="bg-red-50 border-l-4 border-red-400 p-3 flex items-start">
                <AlertTriangle className="text-red-500 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-700">
                    A parcela mensal excede 10% da sua renda. Considere aumentar o número de parcelas ou buscar outra forma de pagamento.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Investment Projection */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <TrendingUp className="text-blue-500 mr-2" />
            Projeção de Investimentos
          </h2>
          <button 
            onClick={() => {
              setTempInvestment({...investment});
              setEditingInvestment(true);
            }}
            className="flex items-center text-blue-500"
          >
            <Edit size={16} className="mr-1" />
            <span className="text-sm">Editar</span>
          </button>
        </div>
        
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/3 px-2 mb-4">
            {editingInvestment ? (
              <div className="mb-4">
                <div className="mb-2">
                  <label className="block text-sm mb-1">Valor Mensal (R$)</label>
                  <input
                    type="number"
                    value={tempInvestment.monthlyAmount}
                    onChange={(e) => setTempInvestment({...tempInvestment, monthlyAmount: parseFloat(e.target.value)})}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Tipo de Investimento</label>
                  <select
                    value={tempInvestment.type}
                    onChange={(e) => setTempInvestment({...tempInvestment, type: e.target.value})}
                    className="border rounded p-2 w-full"
                  >
                    <option value="Selic">Selic</option>
                    <option value="CDB">CDB</option>
                    <option value="Ações">Ações</option>
                    <option value="FIIs">Fundos Imobiliários</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Retorno Anual Esperado (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tempInvestment.expectedAnnualReturn}
                    onChange={(e) => setTempInvestment({...tempInvestment, expectedAnnualReturn: parseFloat(e.target.value)})}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Projeção (anos)</label>
                  <select
                    value={tempInvestment.projectedYears}
                    onChange={(e) => setTempInvestment({...tempInvestment, projectedYears: parseInt(e.target.value)})}
                    className="border rounded p-2 w-full"
                  >
                    {[1, 2, 3, 4, 