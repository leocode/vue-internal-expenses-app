export const parseExpenseBody = (expense) => {
  const { name, amount, spenderId, categoryId, spentAt, fundId, note } =
    expense;
  return {
    name,
    amount: amount != undefined ? Number(amount) : undefined,
    spenderId,
    categoryId,
    spentAt: spentAt ? new Date(spentAt) : undefined,
    fundId,
    note,
  };
};
