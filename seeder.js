const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Link = require('./models/Link');
const Category = require('./models/Category');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const links = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/links.json`, 'utf-8')
);
const categories = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/categories.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Link.create(links);
    await Category.create(categories);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Link.deleteMany();
    await Category.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
