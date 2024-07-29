let expenseAmountButton = document.getElementById('expenseAmountButton');
const errorMessage = document.getElementById("productTitleError")
const list = document.getElementById("list");
const balanceAmount = document.getElementById("balance-amount");
const totalAmount = document.getElementById("amount");
const budgetAmount = document.getElementById("totalAmount");


let tempAmount = 0;
let productName = document.getElementById("name");

  // Set Expense

const expenseAmount = document.getElementById("expense-amount");

totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  //empty or negative input
  if(tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  }
  else{
    errorMessage.classList.add("hide");

    // Set Budget Amount
    totalAmount.innerHTML = tempAmount;
    // Set Balance
    balanceAmount.innerText = tempAmount - expenseAmount.innerText;
    // Clear Input Box
    totalAmount.value = "";

  }

});


/*document.addEventListener("DOMContentLoaded" , expense);*/

/* Function to modify list */
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceAmount.innerText;
  let currentExpense = expenseAmount.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if(edit) {
    let parentText = parentDiv.querySelector(".name").innerText;
    productName.value = parentText;
    expenseAmount.value = parentAmount;
    disableButtons(true);


  }
  totalAmount.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenseAmount.innerText = parseInt(parentAmount);
  parentDiv.remove;
};

/* Function to  Create Expense List */

const listCreator = (expenseName, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-container", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
}








editButton.forEach((editbutton) => {
  editbutton.addEventListener("click", (el) => {
    let id;
    content_id.forEach((ids) => {
    console.log(ids.firstElementChild.dataset.id)
    id = ids.firstElementChild.dataset.id;
  });

  let element = el.target.parentElement.parentElement;
  element.remove();
  console.log(element);

  let expenses = itemList.filter(function (item){
    return item.id == id;
  });
  expenseName.value = expenses[0].title;
  expenseAmount.value = expenses[0].amount;

  let temp_list = itemList.filter(function (item) {
    return item.id != id;
  });
  itemList = temp_list;
  });
});


function showBalance() {
  const expenses = finalTotal();
  const total = parseInt(budgetAmount.innerText) - expenses;
  totalBalance.innerText = total;
}
 
function finalTotal() {
  let total = 0;


if(itemList.length > 0) {
  total = itemList.reduce(function(acc, curr) {
  acc += curr.amount;
  return acc;
  }, 0);
}
expenseAmountDisplay.innerText = total;
return total;
}

// delete event 

deleteButton.forEach((deletebutton) => {
  deletebutton.addEventListener("click", (el) => {
    let id;
    content_id.forEach((ids) => {
    id = ids.firstElementChild.dataset.id;
  });

  let element = el.target.parentElement.parentElement;
  element.remove();

  let temp_list = itemList.filter(function (item) {
    return item.id != id;
  });
  itemList = temp_list;
  showBalance();
  });
});

function addExpenses(list, title, amount, id) {
  const html = `<ul class ="expense-content">
                <li id=${id}>${id}</li>
                <li>${title}</li>
                <li><span>$</span>${amount}</li>
                <li>
                <button type="button" class="btnEdit">Edit</button>
                <button type="button" class="btnDelete">Delete</button>
                </li>
                </ul>`;









                function clearElement(elements){
                  elements.forEach(element => {
                    element.innerHTML = "";
                  })
              }
              
              
              list.addEventListener("click", deleteOrEdit);
              // edit event
              function deleteOrEdit(event) {
                const targetBtn = event.target;
                const entry = targetBtn.parentNode;
                console.log(targetBtn)
              
                if(targetBtn.id == DELETE) {
                  deleteEntry(entry);
                }else if(targetBtn.id == EDIT){
                  editEntry(entry);
                }
              }
              
              
              function deleteEntry(entry) {
                itemList.splice( entry.id, 1);
                var target = event.target;
                var id = target.parentNode;
                target.parentNode.parentNode.removeChild(id);
                
              
                updateBalance();
                
               
                
              
              
              }
              
              function editEntry(entry){
                console.log(entry)
                let LIST = itemList[entry.id];
              
                expenseAmount.value = LIST.amount;
                expenseName.value = LIST.title;
              
                deleteEntry(entry);
              }
              