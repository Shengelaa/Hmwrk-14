const { Router } = require("express");
const {
  findAllExpenses,
  findExpenseById,
  createExpense,
  deleteExpenseById,
  updateExpenseById,
} = require("./expense.service");

const expenseRouter = Router();

expenseRouter.get("/", findAllExpenses);

expenseRouter.get("/:id", findExpenseById);

expenseRouter.post("/", createExpense);

expenseRouter.delete("/:id", deleteExpenseById);

expenseRouter.put("/:id", updateExpenseById);

module.exports = expenseRouter;
