

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

export function addNormalDescription(descriptions, categoryName) {
    if (descriptions.length < 1)
        descriptions.push({ type: 0, description: `You can keep spending money on ${categoryName}!` })
}

//
export function GenerateReport(expense, account, category) {
    let descriptions = [];
    let categoryName = category ? category.name : "";
    if (closeToCategoryLimit(category.expectedExpense, expense.categoryBalance))
        if (surpassedExpectedExpense(category.expectedExpense, expense.categoryBalance))
            descriptions.push({ type: 3, description: `You have spent all the money you can on ${categoryName}` })
        else
            descriptions.push({ type: 4, description: `You are about to reach ${categoryName}'s limit` })
    if (userBalanceUnderLimit(expense.balance, account.initialAmount, 0.10))
        if (aboveSalary(expense.balance))
            descriptions.push({ type: 1, description: `You are above your account's limit!` })
        else
            descriptions.push({ type: 2, description: `Theres less than 10% of your salary left!` })

    addNormalDescription(descriptions, categoryName);
    return descriptions;
}


