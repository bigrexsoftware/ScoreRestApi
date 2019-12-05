const express = require('express');
const {getLinks, 
    getLink, 
    createLink, 
    updateLink, 
    deleteLink
} = require('../controllers/links');

const Link = require('../models/Link');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

router.route('/')
    .get(advancedResults(Link, 'courses'), getLinks)
    .post(createLink);

router.route('/:id')
    .get(getLink)
    .put(updateLink)
    .delete(deleteLink);

module.exports = router;