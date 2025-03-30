document.addEventListener("DOMContentLoaded", function () {
  const balanceEl = document.getElementById("balance");
  const incomeListEl = document.getElementById("income-list");
  const expenseListEl = document.getElementById("expense-list");
  const totalIncomeEl = document.getElementById("total-income");
  const totalExpenseEl = document.getElementById("total-expense");

  const descriptionEl = document.getElementById("description");
  const amountEl = document.getElementById("amount");
  const typeEl = document.getElementById("type");
  const addBtn = document.getElementById("add");

  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  function formatNumber(num) {
      return num.toLocaleString("en-US");
  }

  function updateUI() {
      let totalIncome = 0;
      let totalExpense = 0;

      transactions.forEach((t) => {
          if (t.type === "income") totalIncome += t.amount;
          else totalExpense += t.amount;
      });

      totalIncomeEl.innerText = formatNumber(totalIncome);
      totalExpenseEl.innerText = formatNumber(totalExpense);
      balanceEl.innerText = formatNumber(totalIncome - totalExpense);
  }

  function addTransactionToUI(transaction) {
      const li = document.createElement("li");
      li.innerText = `${transaction.description}: ${formatNumber(transaction.amount)} UZS`;

      if (transaction.type === "income") {
          incomeListEl.prepend(li);
      } else {
          expenseListEl.prepend(li);
      }
  }

  function loadTransactions() {
      incomeListEl.innerHTML = "";
      expenseListEl.innerHTML = "";

      transactions.forEach(addTransactionToUI);
      updateUI();
  }

  addBtn.addEventListener("click", function () {
      const desc = descriptionEl.value.trim();
      const amount = parseFloat(amountEl.value);

      if (desc === "" || isNaN(amount) || amount <= 0) return;

      const newTransaction = { description: desc, amount, type: typeEl.value };
      transactions.unshift(newTransaction); // Add to the beginning
      localStorage.setItem("transactions", JSON.stringify(transactions));

      addTransactionToUI(newTransaction);
      updateUI();

      descriptionEl.value = "";
      amountEl.value = "";
  });

  loadTransactions();
});
