import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api/expenses",
});

export const getExpenses = async () => {
  try {
    const { data } = await axiosClient.get();
    return [null, data];
  } catch (error) {
    return [error];
  }
};

export const addExpense = async (expense) => {
  try {
    const { data } = await axiosClient.post("/", expense);

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
    const { data } = await axiosClient.patch(`/${expense.id}`, expense);
    return [null, data];
  } catch (error) {
    return [error];
  }
};
