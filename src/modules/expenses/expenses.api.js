import axios from "axios";
import { parseExpenseBody } from "./helpers";

const axiosClient = axios.create({
  baseURL: "/api/expenses",
});

export const getExpenses = async (params) => {
  try {
    const { data } = await axiosClient.get("", { params });
    return [null, data];
  } catch (error) {
    return [error];
  }
};

export const addExpense = async (expense) => {
  try {
    const { data } = await axiosClient.post("", parseExpenseBody(expense));

    return [null, data];
  } catch (error) {
    return [error];
  }
};

export const deleteExpense = async (id) => {
  try {
    const { data } = await axiosClient.delete(`/${id}`);
    return [null, data];
  } catch (error) {
    return [error];
  }
};

export const patchExpense = async (expense) => {
  try {
    const { data } = await axiosClient.patch(
      `/${expense.id}`,
      parseExpenseBody(expense)
    );
    return [null, data];
  } catch (error) {
    return [error];
  }
};
