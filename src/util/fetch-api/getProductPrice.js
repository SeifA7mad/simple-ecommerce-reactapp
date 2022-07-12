const getProductPrice = (prices, currency) => {
  const displayedPrice = prices.find(
    (price) =>
      price.currency.label.toLowerCase() === currency.label.toLowerCase()
  );

  return { amount: displayedPrice.amount, symbol: currency.symbol };
};

export default getProductPrice;
