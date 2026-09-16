use('ecommerce');

const result = db.products.deleteOne({
  name: 'Organic Cotton T-Shirt'
});

print(`Deleted products: ${result.deletedCount}`);

print('Remaining products:');
db.products.find(
  {},
  { _id: 0, name: 1, price: 1, category: 1, ratings: 1, tags: 1 }
).sort({ name: 1 }).forEach(printjson);
