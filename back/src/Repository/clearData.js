const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://quentinrodrigues:nel5QwlsEArsZTMS@cluster0.bjhioln.mongodb.net/';
const dbName = 'livecampus-authentication';

async function clearCollections() {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);

    const collections = await db.listCollections().toArray();

    for (let collection of collections) {
      const collectionName = collection.name;
      await db.collection(collectionName).deleteMany({});
      console.log(`La collection ${collectionName} a été vidée.`);
    }

    console.log('Toutes les collections ont été vidées avec succès.');
  } catch (err) {
    console.error('Une erreur s\'est produite :', err);
  } finally {
    await client.close();
  }
}

clearCollections();
