use('ecommerce');

db.products.updateOne(
  { name: 'Wireless Noise-Cancelling Headphones' },
  {
    $set: {
      price: 139.99,
      updatedAt: new Date()
    }
  }
);

db.products.updateOne(
  { name: 'Organic Cotton T-Shirt' },
  {
    $set: {
      'ratings.average': 4.4,
      updatedAt: new Date()
    },
    $inc: { 'ratings.count': 1 }
  }
);

db.products.updateOne(
  { name: 'Stainless Steel Water Bottle' },
  {
    $addToSet: { tags: 'best-seller' },
    $set: { updatedAt: new Date() }
  }
);

db.products.updateMany(
  { category: 'Electronics' },
  { $set: { featured: true, updatedAt: new Date() } }
);

db.products.find(
  {},
  { _id: 0, name: 1, price: 1, category: 1, ratings: 1, tags: 1, featured: 1, updatedAt: 1 }
).sort({ name: 1 }).forEach(printjson);
