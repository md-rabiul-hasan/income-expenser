import React, { useState } from "react";
import Expanse from "./Expanse";
import ExpanseTracer from "./ExpanseTracer";
import Income from "./Income";
import TotalBalance from "./TotalBalance";

export default function IncomeExpanserBoard() {
    const incomeCategory = ["Salary", "Outsourcing", "Bond", "Dividend"];
    const expanseCategory = ["Education", "Food", "Health", "Bill", "Insurance", "Tax", "Transport", "Telephone"];

    const [categories, setCategories] = useState(expanseCategory);
    const [isExpanse, setIsExpanse] = useState(true);
    const [incomeList, setIncomeList] = useState([]);
    const [expanseList, setExpanseList] = useState([]);
    const [updateCost, setUpdateCost] = useState(null);


    function handleToggle(expanse){
        setIsExpanse(expanse);
        setCategories(expanse ? expanseCategory : incomeCategory);
    }

    function handleSaveCost(cost, isAdd){        
        if (isExpanse) {
          if (isAdd) {
            setExpanseList((prevExpanseList) => [...prevExpanseList, cost]);
          } else {
            const newExpanseList = expanseList.map((expanse) => {
              if (expanse.id === cost.id) {
                return cost;  // Replace the existing item with the updated one
              }
              return expanse;  // Return the same item if it's not being updated
            });
            setExpanseList(newExpanseList);  // Update the state with the modified list
            setUpdateCost(null); // Update the cost
          }
            
        } else {
          if (isAdd) {
            setIncomeList((prevIncomeList) => [...prevIncomeList, cost]);
          } else {
            const newIncomeList = incomeList.map((income) => {
              if (income.id === cost.id) {
                return cost;  // Replace the existing item with the updated one
              }
              return income;  // Return the same item if it's not being updated
            });
            setIncomeList(newIncomeList);  // Update the state with the modified list
            setUpdateCost(null); // Update the cost
          }            
        }
    }

    function deleteIncomeData(id) {
      const newIncomeList = incomeList.filter(income => income.id !== id);
      setIncomeList(newIncomeList);
    }

    function deleteExpanseData(id) {
      const newExpanseList = expanseList.filter(expanse => expanse.id!== id);
      setExpanseList(newExpanseList);
    }

    function handleEditIncome(cost){
      console.log(cost);
      setUpdateCost(cost);
      setCategories(incomeCategory);
      setIsExpanse(false);
    }

    function handleEditExpanse(cost){
      setUpdateCost(cost);
      setCategories(expanseCategory);
      setIsExpanse(true);
    }

    function handleIncomeSort(type){
      if(type == "lh"){
        const sortedAscending = incomeList.sort((a, b) => a.amount - b.amount);
        setIncomeList(sortedAscending);
      }else{
        const sortedDescending = incomeList.sort((a, b) => b.amount - a.amount);
        setIncomeList(sortedDescending);
      }
    }

    function handleExpanseSort(type){
      if(type == "lh"){
        const sortedAscending = expanseList.sort((a, b) => a.amount - b.amount);
        setExpanseList(sortedAscending);
      }else{
        const sortedDescending = expanseList.sort((a, b) => b.amount - a.amount);
        setExpanseList(sortedDescending);
      }
    }
  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ExpanseTracer categories={categories} isExpanse={isExpanse} handleToggle={handleToggle} onSave={handleSaveCost} updateCost={updateCost}/>

        <div class="lg:col-span-2">
          <TotalBalance incomeList={incomeList}  expanseList={expanseList}/>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <Income incomeList={incomeList} onDelete={deleteIncomeData} onEdit={handleEditIncome} incomeCategory={incomeCategory} onSort={handleIncomeSort}/>
            <Expanse expanseList={expanseList} onDelete={deleteExpanseData}  onEdit={handleEditExpanse} expanseCategory={expanseCategory} onSort={handleExpanseSort}/>
          </div>
        </div>
      </section>
    </main>
  );
}
