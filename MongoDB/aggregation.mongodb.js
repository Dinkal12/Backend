 use('ecommerce');

// 1. $match + $project + $sort:
print('Products under $100:');
db.products.aggregate([
  { $match: { price: { $lt: 100 } } },
  {
    $project: {
      _id: 0,
      name: 1,
      price: 1,
      category: 1,
      averageRating: '$ratings.average'
    }
  },
  { $sort: { price: 1 } }
]).forEach(printjson);

// 2. $group:
print('\nCategory summary:');
db.products.aggregate([
  {
    $group: {
      _id: '$category',
      productCount: { $sum: 1 },
      averagePrice: { $avg: '$price' },
      highestPrice: { $max: '$price' },
      averageRating: { $avg: '$ratings.average' }
    }
  },
  {
    $project: {
      _id: 0,
      category: '$_id',
      productCount: 1,
      averagePrice: { $round: ['$averagePrice', 2] },
      highestPrice: 1,
      averageRating: { $round: ['$averageRating', 2] }
    }
  },
  { $sort: { productCount: -1, category: 1 } }
]).forEach(printjson);

// 3. $unwind + $group:
print('\nTag usage:');
db.products.aggregate([
  { $unwind: '$tags' },
  { $group: { _id: '$tags', productCount: { $sum: 1 } } },
  { $project: { _id: 0, tag: '$_id', productCount: 1 } },
  { $sort: { productCount: -1, tag: 1 } }
]).forEach(printjson);

// 4. $match + $sort + $limit:
print('\nTop-rated products with 100+ reviews:');
db.products.aggregate([
  { $match: { 'ratings.count': { $gte: 100 } } },
  { $sort: { 'ratings.average': -1, 'ratings.count': -1 } },
  { $limit: 2 },
  {
    $project: {
      _id: 0,
      name: 1,
      price: 1,
      rating: '$ratings.average',
      reviewCount: '$ratings.count'
    }
  }
]).forEach(printjson);
// 5. $facet:
print('\nStore dashboard:');
db.products.aggregate([
  {
    $facet: {
      priceSummary: [
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            totalInventoryValue: { $sum: '$price' },
            averagePrice: { $avg: '$price' }
          }
        },
        {
          $project: {
            _id: 0,
            totalProducts: 1,
            totalInventoryValue: { $round: ['$totalInventoryValue', 2] },
            averagePrice: { $round: ['$averagePrice', 2] }
          }
        }
      ],
      productsByCategory: [
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $project: { _id: 0, category: '$_id', count: 1 } },
        { $sort: { count: -1, category: 1 } }
      ]
    }
  }
]).forEach(printjson);
