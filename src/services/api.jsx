export async function fetchData() {
  const DATA = `{categories {
    name
    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
  }`
  
  const obj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query: DATA})
  }

  const responde = await fetch('http://localhost:4000/graphql', obj);
  const data = await responde.json();
  return data;
}