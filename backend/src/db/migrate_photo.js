require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { db } = require('./database');

async function migratePhoto() {
  console.log('Migrating database...');
  try {
    await db.execute('ALTER TABLE apartments ADD COLUMN owner_photo TEXT');
    console.log('Added column "owner_photo"');
  } catch (err) {
    if (!err.message.includes('duplicate column name')) {
      console.error('Error adding owner_photo:', err.message);
    } else {
      console.log('owner_photo column already exists.');
    }
  }
}

migratePhoto().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
