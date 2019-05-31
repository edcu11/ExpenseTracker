

//user balance is going to down
//category balance (on each expense) is going up osea lo que se ha gastado en esa cat


//pase el limite de categoria
export function surpassedExpectedExpense(categoryLimit, amountSpent) {
    return parseInt(categoryLimit) < parseInt(amountSpent);
}

//gaste mucho de mi salario
export function userBalanceUnderLimit(userBalance, userInitial, limit) {
    return parseInt(userBalance) < parseInt(userInitial) * limit;
}

//arriba del salario
export function aboveSalary(userBalance) {
    return parseInt(userBalance) < 0;
}

//estoy cerca del limite de categoria
export function closeToCategoryLimit(expectedExpense, categoryBalance) {
    // 100         (20)                                  100                             85          :       (15)
    return (parseInt(expectedExpense) * 0.20) > parseInt(expectedExpense) - parseInt(categoryBalance);
}


//
export function GenerateReport(expense, account, lastExpense) {
    let descriptions = [];
    let categoryName = lastExpense.category.name;
    if (userBalanceUnderLimit(expense.balance, account.initialAmount, 0.10))
        descriptions.push({description: `Theres less than 10% of your salary left!`})
    if (aboveSalary(expense.balance))
        descriptions.push({description: `You've succesfully wasted all your money!`})
    if (closeToCategoryLimit(lastExpense.category.expectedExpense, expense.categoryBalance))
        descriptions.push({description: `You are about to reach ${categoryName}'s limit`})
    if (surpassedExpectedExpense(lastExpense.category.expectedExpense, expense.categoryBalance))
        descriptions.push({description: `You have spent all the money you can on ${categoryName}`})
    return descriptions;
}


