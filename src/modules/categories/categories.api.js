import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api/categories",
});

export const getCategories = async () => {
  try {
    const { data } = await axiosClient.get("");

    return [null, data];
  } catch (error) {
    return [error];
  }
};

export const addCategory = async (category) => {
  const { name } = category;
  try {
    const { data } = await axiosClient.post("", { name });

    return [null, data];
  } catch (error) {
    return [error];
  }
};
