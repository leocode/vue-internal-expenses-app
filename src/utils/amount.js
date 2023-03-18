export function formatAmount(amount) {
  return amount.toLocaleString("pl-PL", {
    style: "currency",
    currency: "pln",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
