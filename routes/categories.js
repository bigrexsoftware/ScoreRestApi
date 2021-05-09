const express = require('express');
const {getCategories, 
    getCategory, 
    createCategory, 
    updateCategory, 
    deleteCategory
} = require('../controllers/categories');

const Category = require('../models/Category');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

router.route('/')
    .get(advancedResults(Category, 'courses'), getCategories)
    .post(createCategory);

router.route('/:id')
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory);

module.exports = router;