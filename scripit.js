// BankAccount Class
class BankAccount {
    constructor(accountNumber, accountHolder, balance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            return `Deposited ₹${amount.toFixed(2)} successfully!`;
        } else {
            return "Deposit amount must be positive.";
        }
    }

    withdraw(amount) {
        if (amount > 0) {
            if (this.balance > 500) {
                if (amount <= this.balance - 500) {
                    this.balance -= amount;
                    return `Withdrawn ₹${amount.toFixed(2)} successfully!`;
                } else {
                    return `Insufficient funds. Your balance is ₹${this.balance.toFixed(2)}, but a minimum of ₹500 must remain in your account.`;
                }
            } else {
                return "Minimum balance of ₹500 must be maintained.";
            }
        } else {
            return "Withdrawal amount must be positive.";
        }
    }
}

// Initialize Bank Accounts
const accounts = [
    new BankAccount(1, "Thaneshkumaran R", 500),
    new BankAccount(2, "Thanush", 600),
    new BankAccount(3, "Karuna", 700),
    new BankAccount(4, "Yogesh", 800),
    new BankAccount(5, "Vinoth", 900),
];

// Update Account Information
function updateAccountInfo() {
    const accountNumberInput = parseInt(document.getElementById("accountNumberInput").value.trim(), 10);
    const messageDiv = document.getElementById("message");

    // Validate account number range
    if (isNaN(accountNumberInput) || accountNumberInput < 1 || accountNumberInput > 5) {
        showMessage("Invalid account number. Please enter a number between 1 and 5.", "danger");
        clearAccountInfo();
        return;
    }

    // Find the account by account number
    const account = accounts.find(acc => acc.accountNumber === accountNumberInput);

    if (account) {
        // Update UI with account details
        document.getElementById("accountNumber").innerText = account.accountNumber;
        document.getElementById("accountHolder").innerText = account.accountHolder;
        document.getElementById("balance").innerText = account.balance.toFixed(2);

        // Store the current account for transactions
        window.currentAccount = account;
    } else {
        // Clear UI and show error if account is not found
        clearAccountInfo();
        showMessage("Account not found. Please enter a valid account number.", "danger");
    }
}

// Clear Account Info UI
function clearAccountInfo() {
    document.getElementById("accountNumber").innerText = "";
    document.getElementById("accountHolder").innerText = "";
    document.getElementById("balance").innerText = "";
    window.currentAccount = null;
}

// Display Messages
function showMessage(message, type) {
    const messageDiv = document.getElementById("message");
    messageDiv.className = `alert alert-${type}`;
    messageDiv.innerText = message;
    messageDiv.classList.remove("d-none");
    setTimeout(() => messageDiv.classList.add("d-none"), 3000);
}

// Event Listener for Searching Account
document.getElementById("searchAccountBtn").addEventListener("click", updateAccountInfo);

// Event Listeners for Deposit and Withdraw
document.getElementById("depositBtn").addEventListener("click", () => {
    const amount = parseFloat(document.getElementById("amount").value);
    if (window.currentAccount) {
        if (isNaN(amount) || amount <= 0) {
            showMessage("Please enter a valid deposit amount.", "danger");
            return;
        }
        const message = window.currentAccount.deposit(amount);
        updateAccountInfo();
        showMessage(message, "success");
    } else {
        showMessage("No account selected. Please search for an account first.", "danger");
    }
});

document.getElementById("withdrawBtn").addEventListener("click", () => {
    const amount = parseFloat(document.getElementById("amount").value);
    if (window.currentAccount) {
        if (isNaN(amount) || amount <= 0) {
            showMessage("Please enter a valid withdrawal amount.", "danger");
            return;
        }
        const message = window.currentAccount.withdraw(amount);
        updateAccountInfo();
        if (message.includes("successfully")) {
            showMessage(message, "success");
        } else {
            showMessage(message, "danger");
        }
    } else {
        showMessage("No account selected. Please search for an account first.", "danger");
    }
});
