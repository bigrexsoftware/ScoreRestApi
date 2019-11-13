const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Link = require('../models/Link');

// @desc    Get all links
// @route   GET /api/v1/links
// @access  Public
exports.getLinks = asyncHandler(async (req,res,next) => {
    res.status(200).json(res.advancedResults);
});

// @desc    Get single link
// @route   GET /api/v1/links/:id
// @access  Public
exports.getLink = asyncHandler(async (req,res,next) => {
    const record = await Link.findById(req.params.id);
    if(!record) {
        return next(new ErrorResponse(`Link not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({success: true, data: link});
});

// @desc    Create new link
// @route   POST /api/v1/links
// @access  Private
exports.createLink = asyncHandler(async (req,res,next) => {
    const record = await Link.create(req.body);
    res.status(201).json({success: true, data: link});
});

// @desc    Update link
// @route   PUT /api/v1/links/:id
// @access  Private
exports.updateLink = asyncHandler(async (req,res,next) => {   
    const record = await Link.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true    
    });
    if(!record){
        return next(new ErrorResponse(`Link not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({success: true, data: link});
});

// @desc    Delete link
// @route   DELETE /api/v1/links/:id
// @access  Private
exports.deleteLink = asyncHandler(async (req,res,next) => {
    const record = await Link.findById(req.params.id);
    if(!record){
        return next(new ErrorResponse(`Link not found with id of ${req.params.id}`, 404));
    }

    link.remove();

    res.status(200).json({success: true, data: {} });
}); 
