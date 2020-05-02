const { getDb, getNextSequence } = require('./db.js');

async function get(_, { id }) {
    const db = getDb();
    const product = await db.collection('products').findOne({ id });
    return product;
}

async function productList() {
    const db = getDb();
    const products = await db.collection('products').find({}).toArray();
    return products;
}

async function productAdd(_, { product }) {
    const db = getDb();
    const newProduct = { ...product };
    newProduct.id = await getNextSequence('products');
    const result = await db.collection('products').insertOne(newProduct);
    const savedProduct = await db.collection('products').findOne({ _id: result.insertedId });
    return savedProduct;
}

async function update(_, { id, changes }) {
    const db = getDb();
    if(changes.Name || changes.Image || changes.Category || changes.Price) {
        const product = await db.collection('products').findOne({ id });
        Object.assign(product, changes);
    }
    await db.collection('products').updateOne({ id }, { $set: changes });
    const savedProduct = await db.collection('products').findOne({ id });
    return savedProduct;
}

async function remove(_, { id }) {
    const db = getDb();
    const product = await db.collection('products').findOne({ id });
    if(!product) return false;
    
    result = await db.collection('products').removeOne({ id });
    return result.deletedCount === 1;
}

module.exports = { 
    productList, 
    productAdd, 
    get, 
    update, 
    delete: remove,
};