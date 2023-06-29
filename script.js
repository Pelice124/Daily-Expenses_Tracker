// Retrieve the expense form and expense table elements
const expenseForm = document.getElementById('expenseForm');
const expenseTable = document.getElementById('expenseTable');

// Add event listener for form submission
expenseForm.addEventListener('submit', addExpense);

// Array to store recorded expenses
let expenses = [];

// Check if there are any expenses in local storage for the current month and retrieve them
const currentMonth = getCurrentMonth();
if (localStorage.getItem(currentMonth)) {
  expenses = JSON.parse(localStorage.getItem(currentMonth));
  displayExpenses();
}

// Function to add an expense
function addExpense(event) {
  event.preventDefault();

  // Retrieve expense details from form inputs
  const descriptionInput = document.getElementById('description');
  const amountInput = document.getElementById('amount');
  const dateInput = document.getElementById('date');

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;

  // Get the target amount for the day
  const targetInput = document.getElementById('target');
  const targetAmount = parseFloat(targetInput.value);

  // Check if the expense amount exceeds the target amount
  if (amount > targetAmount) {
    // Alert the user
    alert(`Warning: You are spending more than your target amount for the day!`);
    return; // Stop further execution of the function
  }

  // Create a new expense object
  const expense = {
    description: description,
    amount: amount,
    date: date
  };

  // Add the expense to the expenses array
  expenses.push(expense);

  // Clear the form inputs
  descriptionInput.value = '';
  amountInput.value = '';
  dateInput.value = '';

  // Display the updated expenses
  displayExpenses();

  // Save expenses to local storage for the current month
  saveExpenses(currentMonth);
}

// Function to display the expenses in the table
function displayExpenses() {
  // Clear the table body
  expenseTable.innerHTML = '<tr><th>Date</th><th>Description</th><th>Amount</th><th>Actions</th></tr>';

  // Iterate through the expenses and append rows to the table
  expenses.forEach(expense => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${expense.date}</td><td>${expense.description}</td><td>${expense.amount}</td><td><button onclick="clearExpenses('${currentMonth}')">Clear</button></td>`;
    expenseTable.appendChild(row);
  });
}

// Function to save expenses to local storage for a specific month
function saveExpenses(month) {
  localStorage.setItem(month, JSON.stringify(expenses));
}

// Function to get the current month in the format "YYYY-MM"
function getCurrentMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding padding zero if necessary
  return `${year}-${month}`;
}

// Function to clear expenses for a specific month
function clearExpenses(month) {
  if (confirm(`Are you sure youwant to clear expenses for ${month}?`)) {
    localStorage.removeItem(month);
    expenses = [];
    displayExpenses();
  }
}

