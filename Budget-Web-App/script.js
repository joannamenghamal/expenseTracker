let totalBalance = document.getElementById("amount");
let budgetAmount = document.getElementById("totalAmount");
let budgetValue = document.getElementById("balance-amount");
let totalAmountButton = document.getElementById("totalAmountButton");
let list = document.getElementById("list");
let expenseAmountButton = document.getElementById("expenseAmountButton");
let expenseName = document.getElementById("name");
let expenseAmount = document.getElementById("expense-amount");
const errorMessage = document.getElementById("productTitleError");
const errorMessage2 = document.getElementById("budget-error");
let expenseAmountDisplay = document.getElementById("expenseAmountDisplay");
let tempAmount = 0;
let tempBudgetAmount = 0;

let budget = parseInt(budgetAmount);
let id = 0;
let value = 0;

var array;
const object_data = {
  budget: 0,
  total_expenses: 0,
  balance: 0,
  expenses: []
};

// Initialize local storage
if (localStorage.getItem("array")) {
  array = JSON.parse(localStorage.getItem("array"));
  setValues();
} else {
  localStorage.setItem("array", JSON.stringify(object_data));
  array = object_data;
}




totalAmountButton.addEventListener("click", () => {
  if(budgetValue < 0) {
    errorMessage2.classList.remove("hide");
  }
  else{
    errorMessage2.classList.add("hide");
    updateBalance(false);

    // Clear input box
    budgetValue.value = "";
  
  }
});

// Input expense description and amount
expenseAmountButton.addEventListener("click", () => {
tempAmount = expenseAmount.value;
let amount = parseInt(tempAmount);
let title = expenseName.value;
  if(tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  }
  else{
    errorMessage.classList.add("hide");
    array.expenses.push({
      title: title,
      value: amount
    });

    // Clear Input Box
    expenseAmount.value = "";
    expenseName.value = "";



    updateBalance(true);

  }
});

// Update balance
function updateBalance(val) {

  if(!val){
    array.budgetAmount = budgetValue.value;
  }
  array.expenseBalance = calculateExpense();
  array.totalBalance = tempBudgetAmount - array.expenseBalance;
  localStorage.setItem("array", JSON.stringify(array));
  setValues();
}

function setValues() {
  budgetAmount.innerHTML = `$ ${array.budgetAmount}`;
  expenseAmountDisplay.innerHTML = `$ ${array.expenseBalance}`;
  totalBalance.innerHTML = `$ ${array.totalBalance}`;

  addExpenses();
}

// Calculate final expense total
function calculateExpense() {
  let total = 0;

  if(array.expenses); {
    for (let item of array.expenses) {
      total += parseInt(item.value);
    } 
  }
  return total;
}

// Create expense list
function addExpenses() {
  let content = "";
  for (let [index, item] of array.expenses.entries()) {
    let divs = `
      <div class="list-item">
        <div class="col"> ${item.title}</div>
        <div class="col">$ ${item.value}</div>
        <div class="col">
          <i id="${index}" class="delete fa fa-trash"></i>
        </div>
      </div>
    `;
    content += divs;
  }
  let el = document.querySelector("#list");
  el.innerHTML = content;

  setEvents();
}




function setEvents() {
  let deleteButton = document.querySelectorAll(".delete");

  deleteButton.forEach(item => {
    item.addEventListener("click", deleteExpense, false);
  });
}


function deleteExpense(e) {
  let id = e.target.id
  array.expenses.splice(id, 1);
  updateBalance(true);
}

//localStorage.clear();