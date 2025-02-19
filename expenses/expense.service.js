const { isValidObjectId } = require("mongoose");
const expenseModel = require("../models/expenses.model");
const userModel = require("../models/user.model");

const findAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.find().populate("user", "name email");
    res.json(expenses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching expenses." });
  }
};

const findExpenseById = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ message: "Invalid expense ID provided." });

  try {
    const expense = await expenseModel.findById(id);
    if (!expense)
      return res.status(404).json({ message: "Expense not found." });

    res.json(expense);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching the expense." });
  }
};

const createExpense = async (req, res) => {
  const { title, amount, category } = req.body;
  if (!title || !amount || !category)
    return res
      .status(400)
      .json({ message: "Missing required fields (title, amount, category)." });

  try {
    const expense = await expenseModel.create({
      title,
      amount,
      category,
      user: req.userId,
    });

    await userModel.findByIdAndUpdate(req.userId, {
      $push: { expenses: expense._id },
    });
    res.status(201).json(expense);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while creating the expense." });
  }
};

const deleteExpenseById = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ message: "Invalid expense ID provided." });

  try {
    const deletedExpense = await expenseModel.findByIdAndDelete(id);
    if (!deletedExpense)
      return res
        .status(400)
        .json({ message: `Cannot delete expense by id: ${id}` });

    await userModel.updateOne(
      { _id: req.userId },
      { $pull: { expenses: deletedExpense._id } }
    );
    res.json({ message: "Expense deleted successfully", data: deletedExpense });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the expense." });
  }
};

const updateExpenseById = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ message: "Invalid expense ID provided." });

  const updateRequest = {};
  const { title, amount, category } = req.body;

  if (title) updateRequest.title = title;
  if (amount) updateRequest.amount = amount;
  if (category) updateRequest.category = category;

  try {
    const updatedExpense = await expenseModel.findByIdAndUpdate(
      id,
      updateRequest,
      { new: true }
    );
    res.json({ message: "Expense updated successfully", data: updatedExpense });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while updating the expense." });
  }
};

module.exports = {
  findAllExpenses,
  findExpenseById,
  createExpense,
  deleteExpenseById,
  updateExpenseById,
};


