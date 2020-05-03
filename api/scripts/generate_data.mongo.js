/* global db print */
/* eslint no-restricted-globals: "off" */

const names = ['Ravan', 'Eddie', 'Pieta', 'Parvati', 'Victor'];
const categories = ['Shirts', 'Jeans'];

const initialCount = db.products.count();

for (let i = 0; i < 100; i += 1) {
  const Name = names[Math.floor(Math.random() * 5)];
  const Category = categories[Math.floor(Math.random() * 4)];
  const Price = Math.ceil(Math.random() * 20);
  const Image = `Lorem ipsum dolor sit amet, ${i}`;
  const id = initialCount + i + 1;

  const product = {
    id, Name, Category, Image, Price,
  };

  db.products.insertOne(product);
}

const count = db.products.count();
db.counters.update({ _id: 'products' }, { $set: { current: count } });

print('New product count:', count);