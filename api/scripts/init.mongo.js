/* global db print */
/* eslint no-restricted-globals: "off" */
/* eslint linebreak-style: ["error", "windows"] */

db.products.remove({});
db.delete_products.remove({});

const productsDB = [
  {
    id: 1,
    Category: 'Shirts',
    Price: 8,
    Name: 'Coats',
    Image: '',
  },
  {
    id: 2,
    Category: 'Shirts',
    Price: 89,
    Name: 'Coatss',
    Image: '',
  },
];

db.products.insertMany(productsDB);
const count = db.products.count();
print('Inserted', count, 'products');

db.counters.remove({ _id: 'products' });
db.counters.insert({ _id: 'products', current: count });

db.products.createIndex({ id: 1 }, { unique: true });
db.products.createIndex({ Name: 1 });
db.products.createIndex({ Category: 1 });
db.products.createIndex({ Price: 1 });

db.delete_products.createIndex({ id: 1 }, { unique: true });
