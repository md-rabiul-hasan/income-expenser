import React, { useEffect, useState } from "react";

export default function ExpanseTracer({ categories, isExpanse, handleToggle, onSave, updateCost }) {
  const [isAdd, setIsAdd] = useState(true);
  const [cost, setCost] = useState({
    id: crypto.randomUUID(),
    category: "",
    amount: "",
    date: "",
  });

  // Effect to update cost state when editing
  useEffect(() => {
    if (updateCost) {
      setCost(updateCost);
      setIsAdd(false);
    }else{
      setIsAdd(true);
    }
  }, [updateCost]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCost((prevCost) => ({
      ...prevCost,
      [name]: value,
    }));
  }

  function handleSave() {
    // Basic validation to check if all fields are filled
    if (!cost.category || !cost.amount || !cost.date) {
      alert("Please fill in all fields before saving.");
      return;
    }

    // If editing, keep the existing ID; otherwise, generate a new one
    const newCost = { ...cost, id: updateCost ? cost.id : crypto.randomUUID() };

    onSave(newCost, isAdd);

    // Reset the form after saving
    setCost({
      id: crypto.randomUUID(),
      category: "",
      amount: "",
      date: "",
    });
  }

  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>

      <form>
        <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
          <div
              onClick={() => {
                handleToggle(true);       // Then set isAdd to true
              }}
            
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${isExpanse ? "active" : ""}`}
          >
            Expense
          </div>
          <div
            onClick={() => {
              handleToggle(false);     // Then set isAdd to true
            }}
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${isExpanse ? "" : "active"}`}
          >
            Income
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900 text-left">
            Category
          </label>
          <div className="mt-2">
            <select
              id="category"
              name="category"
              value={cost.category}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900 text-left">
            Amount
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="amount"
              id="amount"
              value={cost.amount}
              onChange={handleChange}
              placeholder="12931"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900 text-left">
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              id="date"
              value={cost.date}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
        >
          {isAdd ? 'Save' : 'Update'}
        </button>
      </form>
    </div>
  );
}
