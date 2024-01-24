// Product Module
function createProduct(name, category, startPrice, sellerName) {
    return {
      name,
      category,
      startPrice,
      sellerName,
      variants: [],
      addVariant: function (size, price) {
        this.variants.push(createVariant(size, price));
      },
    };
  }
  
  // Variant Module
  function createVariant(size, price) {
    return {
      size,
      price,
    };
  }
  
  // User Module
  function createUser(name, phone, email, password) {
    return {
      name,
      phone,
      email,
      password,
    };
  }
  
  // Example Usage
  const product = createProduct('Iphone', 'Electronics', 40000, 'Easesmith');
  product.addVariant('Mini', 60000);
  
  const user = createUser('Sarthak', '1234567890', 'sg@example.com', 'password123');
  
  console.log(product);
  console.log(user);
  
  