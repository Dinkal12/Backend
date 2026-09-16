use('ecommerce');
print('All products:');
db.products.find({}, { _id: 0 }).sort({ createdAt: -1 }).forEach(printjson);
name.
print('\nOne product:');
printjson(
  db.products.findOne(
    { name: 'Wireless Noise-Cancelling Headphones' },
    { _id: 0 }
  )
);

print('\nElectronics products:');
db.products.find(
  { category: 'Electronics' },
  { _id: 0, name: 1, price: 1, ratings: 1 }
).forEach(printjson);

print('\nProducts tagged eco-friendly:');
db.products.find(
  { tags: 'eco-friendly' },
  { _id: 0, name: 1, tags: 1, price: 1 }
).forEach(printjson);

print('\nHighly rated products under $100:');
db.products.find(
  { price: { $lt: 100 }, 'ratings.average': { $gte: 4.5 } },
  { _id: 0, name: 1, price: 1, ratings: 1 }
).sort({ 'ratings.average': -1 }).forEach(printjson);
