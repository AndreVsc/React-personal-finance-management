import React, { createContext, useState, useContext, useEffect } from 'react';

const FinanceContext = createContext();

const loadFromLocalStorage = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultValue;
      }
    }
    return defaultValue;
  };

  export function FinanceProvider({ children }) {
    const [income, setIncome] = useState(() => 
      loadFromLocalStorage('income', 325)
    );
    
    const [categories, setCategories] = useState(() =>
      loadFromLocalStorage('categories', [
        { name: "Necessidades", allocation: 30, max: 97.5, spent: 50, color: "#3498db" },
        { name: "Lazer", allocation: 20, max: 65, spent: 50, color: "#2ecc71" },
        { name: "Investimentos", allocation: 15, max: 48.75, spent: 20, color: "#9b59b6" },
        { name: "Emergências", allocation: 5, max: 16.25, spent: 10, color: "#f1c40f" }
      ])
    );

    const [savingsGoal, setSavingsGoal] = useState(() =>
      loadFromLocalStorage('savingsGoal', {
        totalGoal: 30000,
        months: 24,
        savedAmount: 5000
      })
    );

    const [purchaseGoal, setPurchaseGoal] = useState(() =>
      loadFromLocalStorage('purchaseGoal', {
        product: "Notebook",
        totalValue: 5000,
        paymentMethod: "Crédito",
        installments: 10,
        interestRate: 1.5,
        totalWithInterest: 5802.7,
        monthlyPayment: 580.27
      })
    );

    const [investment, setInvestment] = useState(() =>
      loadFromLocalStorage('investment', {
        monthlyAmount: 750,
        investmentType: "CDB",
        annualReturn: 8.5,
        projectionYears: 5,
        projectedValue: 55832
      })
    );

  // Atualizar valores máximos das categorias quando a renda mudar
  useEffect(() => {
    const updatedCategories = categories.map(category => {
      const newMax = (income * category.allocation) / 100;
      return {
        ...category,
        max: newMax
      };
    });
    setCategories(updatedCategories);
  }, [income]);

  // Recalcular pagamento mensal para meta de compra
  useEffect(() => {
    if (purchaseGoal.paymentMethod === "Crédito" && purchaseGoal.installments > 0) {
      let totalWithInterest = purchaseGoal.totalValue;
      if (purchaseGoal.interestRate > 0) {
        totalWithInterest = purchaseGoal.totalValue * Math.pow(1 + purchaseGoal.interestRate / 100, purchaseGoal.installments);
      }
      
      const monthlyPayment = totalWithInterest / purchaseGoal.installments;
      
      setPurchaseGoal(prev => ({
        ...prev,
        totalWithInterest: parseFloat(totalWithInterest.toFixed(2)),
        monthlyPayment: parseFloat(monthlyPayment.toFixed(2))
      }));
    }
  }, [purchaseGoal.totalValue, purchaseGoal.installments, purchaseGoal.interestRate, purchaseGoal.paymentMethod]);

  // Calcular projeção de investimento
  useEffect(() => {
    const months = investment.projectionYears * 12;
    const monthlyRate = investment.annualReturn / 100 / 12;
    
    const projectedValue = investment.monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    setInvestment(prev => ({
      ...prev,
      projectedValue: Math.round(projectedValue)
    }));
  }, [investment.monthlyAmount, investment.annualReturn, investment.projectionYears]);

  // Salvar dados no localStorage quando mudarem
  useEffect(() => {
    localStorage.setItem('income', JSON.stringify(income));
  }, [income]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('savingsGoal', JSON.stringify(savingsGoal));
  }, [savingsGoal]);

  useEffect(() => {
    localStorage.setItem('purchaseGoal', JSON.stringify(purchaseGoal));
  }, [purchaseGoal]);

  useEffect(() => {
    localStorage.setItem('investment', JSON.stringify(investment));
  }, [investment]);

  // Função para atualizar categoria de gasto
  const updateCategory = (index, updates) => {
    const newCategories = [...categories];
    newCategories[index] = { ...newCategories[index], ...updates };
    
    if (updates.allocation) {
      newCategories[index].max = (income * updates.allocation) / 100;
    }
    
    setCategories(newCategories);
    recalculateGoals(newCategories);
  };

  // Função para recalcular metas de economia e investimentos
  const recalculateGoals = (categories) => {
    const investmentCategory = categories.find(cat => cat.name === "Investimentos");
    if (investmentCategory) {
      setInvestment(prev => ({
        ...prev,
        monthlyAmount: investmentCategory.max
      }));
    }

    const savingsCategory = categories.find(cat => cat.name === "Emergências");
    if (savingsCategory) {
      setSavingsGoal(prev => ({
        ...prev,
        savedAmount: savingsCategory.spent
      }));
    }
  };

  // Função para atualizar gasto real
  const updateSpent = (index, spent) => {
    const newCategories = [...categories];
    newCategories[index].spent = spent;
    setCategories(newCategories);
    recalculateGoals(newCategories);
  };

  // Função para calcular balanço mensal
  const calculateBalance = () => {
    const totalMax = categories.reduce((sum, cat) => sum + cat.max, 0);
    const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
    return totalMax - totalSpent;
  };

  // Função para verificar se meta de compra excede limite recomendado (10% da renda)
  const isPurchaseExceedingLimit = () => {
    return purchaseGoal.monthlyPayment > income * 0.1;
  };

  return (
    <FinanceContext.Provider 
      value={{
        income,
        setIncome,
        categories,
        setCategories,
        updateCategory,
        updateSpent,
        savingsGoal,
        setSavingsGoal,
        purchaseGoal,
        setPurchaseGoal,
        investment,
        setInvestment,
        calculateBalance,
        isPurchaseExceedingLimit
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);