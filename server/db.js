const db = require('mongoose');

db.Promise = global.Promise;

async function connect() {
  await db.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log('[db] DB is connected');
}

module.exports = connect;