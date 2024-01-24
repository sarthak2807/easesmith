class ModelFeatures {
  constructor(items) {
    this.items = items;
  }

  filter(filterCondition) {
    return this.items.filter(filterCondition);
  }

  search(name) {
    if(name=='Sarthak')
    {
        console.log("success")
    }
    else{
      console.log("fail")
    }
  }

  paginate(page, pageSize) {
    const startIndex = (page - 1) * pageSize;
    return this.items.slice(startIndex, startIndex + pageSize);
  }

  sort(sortField, sortOrder) {
    const sortedItems = [...this.items];

    sortedItems.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else if (sortOrder === 'desc') {
        return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
      } else {
        throw new Error('Invalid sortOrder. Use "asc" or "desc".');
      }
    });

    return sortedItems;
  }
}

// Example with Product and User
const products = [
  { name: 'Iphone', category: 'Electronics', startPrice: 40000, sellerName: 'Easesmith' },
  { name: 'Headphone', category: 'Electronics', startPrice: 5999, sellerName: 'Techify' },
 
];

const users = [
  { name: 'Sarthak', phone: '1234567890', email: 'sarthak@example.com', password: 'password123' },
  { name: 'Vishal', phone: '9876543210', email: 'vishal@example.com', password: 'securePwd' },
];

const productFeatures = new ModelFeatures(products);
const filteredProducts = productFeatures.filter((product) => product.startPrice > 6900);

const userFeatures = new ModelFeatures(users);
const searchedUsers = userFeatures.search('Sarthak');
const paginatedUsers = userFeatures.paginate(1, 5);
const sortedUsers = userFeatures.sort('name', 'asc');
