'use strict';
let eachSeries = require('async/eachSeries');

module.exports = function (Expense) {

    Expense.createExpense = function (expense, descriptions, next) {
        // console.log("Expnse create;", expense, "\n\ndescriptions", descriptions);
        Expense.create(expense, (expenseError, expenseCreated) => {
            if (expenseError)
                return next(expenseError);

            Expense.beginTransaction({ isolationLevel: 'READ COMMITTED', timeout: 15000 }, function (err, tx) {
                if (err)
                    next(err);
                const extraRollbacks = (id) => {
                    Expense.destroyById(id, (destroyError) => {
                        if (destroyError) {
                            return;
                        }
                    });
                }

                eachSeries(descriptions, (description, callback) => {
                    description.expenseId = expenseCreated.id;
                    Expense.app.models.description.create(description, { transaction: tx }, (descriptionError, descriptionCreated) => {
                        if (descriptionError)
                            return callback(descriptionError);
                        return callback();
                    });
                }, (callbackError, callbackResponse) => {

                    Expense.app.models.account.updateAll(
                        { id: expense.accountId },
                        { balance: expense.balance }, { transaction: tx },
                        (updateError, updateResponse) => {
                            if (callbackError || updateError) {
                                tx.rollback(function (rollbackError) {
                                    if (rollbackError) {
                                        return next(rollbackError);
                                    }
                                    extraRollbacks(expenseCreated.id);
                                });
                                return next(callbackError);
                            }
                            tx.commit(function (commitError) {
                                if (commitError) {
                                    return next(commitError);
                                }
                                return next(commitError);
                            });
                        }
                    );

                });
            }); //transaction end
        });

    }

    Expense.remoteMethod("createExpense", {
        accepts: [
            { arg: "expense", type: 'object' },
            { arg: "descriptions", type: 'array' },
        ],
        http: {
            path: '/createExpense',
            verb: 'post'
        },
        returns: { arg: "receiptInfo", type: "object" }
    });




};
