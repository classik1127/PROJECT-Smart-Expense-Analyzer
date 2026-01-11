const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const totalText = document.getElementById("total");
const message = document.getElementById("message");
const insight = document.getElementById("insight");

let expenses = [];

addBtn.onclick = function () {
  const name = document.getElementById("name").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (!name || !amount || !category) {
    message.textContent = "Please fill all fields";
    message.style.color = "red";
    return;
  }

  const expense = {
    name,
    amount,
    category
  };

  expenses.push(expense);
  message.textContent = "";
  displayExpenses();
  calculateTotal();
  generateInsight();

  document.getElementById("name").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
};

function displayExpenses() {
  list.innerHTML = "";

  expenses.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.category})`;
    
    const price = document.createElement("span");
    price.textContent = `₦${item.amount.toFixed(2)}`;

    li.appendChild(price);
    list.appendChild(li);
  });
}

function calculateTotal() {
  const total = expenses.reduce(function (sum, item) {
    return sum + item.amount;
  }, 0);

  totalText.textContent = total.toFixed(2);
}

function generateInsight() {
  const food = expenses
    .filter(item => item.category === "Food")
    .reduce((sum, item) => sum + item.amount, 0);

  const transport = expenses
    .filter(item => item.category === "Transport")
    .reduce((sum, item) => sum + item.amount, 0);

  if (food > transport && food > 0) {
    insight.textContent = "You spend most on food 🍔";
  } else if (transport > food && transport > 0) {
    insight.textContent = "Transport costs are high 🚗";
  } else {
    insight.textContent = "Your spending is balanced ⚖️";
  }
}
