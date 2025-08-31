const db = require('./db');

async function createTable() {
  const exists = await db.schema.hasTable('toys');
  if (!exists) {
    await db.schema.createTable('toys', (table) => {
      table.increments('id');
      table.string('brand');
      table.string('title');
      table.string('description');
      table.decimal('price', 10, 2);
      table.decimal('discountedPrice', 10, 2);
      table.string('image');
    });

    await db('toys').insert([
      {
        brand: 'Lehmann Crafts',
        title: 'Wooden Monster Car',
        description: 'Wooden Car Kit for ages 12 and up (includes tools)',
        price: 54.99,
        discountedPrice: 52.99,
        image: 'https://via.placeholder.com/150',
      },
      {
        brand: 'SkyJets',
        title: 'Snap-Fit Jumbo Jet',
        description: 'Durable snap-fit plane kit.',
        price: 49.99,
        discountedPrice: 45.99,
        image: 'https://via.placeholder.com/150',
      },
    ]);

    console.log('✅ Table created and data inserted');
  } else {
    console.log('⚠️ Table already exists');
  }

  process.exit();
}

createTable();
