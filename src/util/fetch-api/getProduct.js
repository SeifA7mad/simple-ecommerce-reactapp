const getProduct = async (productId) => {
  const graphqlQuery = {
    query: `
        query {
          product(id: "${productId}") {
            id name inStock gallery brand description
            prices { amount currency{ label } }
            attributes {id name type items {id displayValue value}}
          }
        }
      `,
  };
  try {
    const response = await fetch('http://localhost:4000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphqlQuery),
    });
    const resData = await response.json();
    return resData.data.product;
  } catch (err) {
    console.log(err);
  }
};

export default getProduct;
