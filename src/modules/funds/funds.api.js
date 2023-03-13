import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api/funds",
});

export const getFunds = async () => {
  try {
    const { data } = await axiosClient.get("");

    return [null, data];
  } catch (error) {
    return [error];
  }
};

export const addFund = async (fund) => {
  const { name } = fund;
  try {
    const { data } = await axiosClient.post("", { name });

    return [null, data];
  } catch (error) {
    return [error];
  }
};

export const deleteFund = async (fundId) => {
  try {
    const { data } = await axiosClient.delete(`/${fundId}`);

    return [null, data];
  } catch (error) {
    return [error];
  }
};
