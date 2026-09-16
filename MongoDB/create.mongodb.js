use('ecommerce');

db.createCollection('products', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'price', 'category', 'ratings', 'tags', 'createdAt'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'Product name is required.'
        },
        price: {
          bsonType: ['double', 'decimal', 'int', 'long'],
          minimum: 0,
          description: 'Price must be a non-negative number and is required.'
        },
        category: {
          bsonType: 'string',
          description: 'Product category is required.'
        },
        ratings: {
          bsonType: 'object',
          required: ['average', 'count'],
          properties: {
            average: {
              bsonType: ['double', 'decimal', 'int', 'long'],
              minimum: 0,
              maximum: 5
            },
            count: {
              bsonType: ['int', 'long'],
              minimum: 0
            }
          }
        },
        tags: {
          bsonType: 'array',
          items: { bsonType: 'string' },
          description: 'Tags must be an array of strings.'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Creation date is required.'
        }
      }
    }
  },
  validationLevel: 'strict',
  validationAction: 'error'
});

db.products.createIndex({ category: 1 });
db.products.createIndex({ tags: 1 });
db.products.createIndex({ price: 1 });
db.products.createIndex({ createdAt: -1 });

db.products.insertMany([
  {
    name: 'Wireless Noise-Cancelling Headphones',
    price: 149.99,
    category: 'Electronics',
    ratings: { average: 4.6, count: 248 },
    tags: ['wireless', 'audio', 'headphones', 'noise-cancelling'],
    createdAt: new Date('2026-09-16T00:00:00.000Z')
  },
  {
    name: 'Organic Cotton T-Shirt',
    price: 24.5,
    category: 'Clothing',
    ratings: { average: 4.3, count: 91 },
    tags: ['organic', 'cotton', 'casual', 't-shirt'],
    createdAt: new Date('2026-09-16T00:00:00.000Z')
  },
  {
    name: 'Stainless Steel Water Bottle',
    price: 19.99,
    category: 'Home & Kitchen',
    ratings: { average: 4.8, count: 376 },
    tags: ['reusable', 'bottle', 'kitchen', 'eco-friendly'],
    createdAt: new Date('2026-09-16T00:00:00.000Z')
  }
]);

db.products.find();

