import React from "react";

export default function TotalBalance({ incomeList, expanseList }) {
  const totalIncome = incomeList.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpense = expanseList.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const balance = totalIncome - totalExpense;

  // Determine the text color based on the balance
  let balanceColor;
  if (balance > 0) {
    balanceColor = 'text-green-700'; // Positive balance
  } else if (balance < 0) {
    balanceColor = 'text-red-700'; // Negative balance
  } else {
    balanceColor = 'text-gray-700'; // Neutral balance
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl">
        <dl className="grid grid-cols-1 text-center lg:grid-cols-3 divide-x-2 border rounded-md overflow-hidden">
          <div className="bg-[#F9FAFB] flex lg:max-w-xs flex-col px-4 py-4">
            <dt className="text-base leading-7 text-gray-600">Balance</dt>
            <dd className={`order-first text-xl font-semibold tracking-tight ${balanceColor} sm:text-3xl`}>
              BDT {balance.toFixed(2)}
            </dd>
          </div>
          <div className="bg-[#F9FAFB] flex lg:max-w-xs flex-col px-4 py-4">
            <dt className="text-base leading-7 text-gray-600">Total Income</dt>
            <dd className="order-first text-xl font-semibold tracking-tight text-gray-700 sm:text-3xl">
              BDT {totalIncome.toFixed(2)}
            </dd>
          </div>
          <div className="bg-[#F9FAFB] flex lg:max-w-xs flex-col px-4 py-4">
            <dt className="text-base leading-7 text-gray-600">Total Expense</dt>
            <dd className="order-first text-xl font-semibold tracking-tight text-gray-700 sm:text-3xl">
              BDT {totalExpense.toFixed(2)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
