import axios from "axios";

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
  const { name, amount, spenderId, categoryId } = expense;
  try {
    const { data } = await axiosClient.post("", {
      name,
      amount: Number(amount),
      spenderId,
      categoryId,
    });

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
  const { name, amount, spenderId, categoryId, fundId } = expense;

  try {
    const { data } = await axiosClient.patch(`/${expense.id}`, {
      name,
      amount: amount != undefined ? Number(amount) : undefined,
      spenderId,
      categoryId,
      fundId,
    });
    return [null, data];
  } catch (error) {
    return [error];
  }
};
