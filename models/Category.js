const mongoose = require('mongoose');
const slugify = require('slugify');

const CategorySchema = new mongoose.Schema(
    {
        sortOrder: {
            type: String,
            trim: true,
            maxLength: [5, 'Sort Order can not be more than five characters']
        },
        name: {
            type: String,
            trim: true,
            maxLength: [100, 'Category name can not be more than 100 characters']
        },
        slug: String,
        parentId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category'
        }
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
)

// Create slug from the category name
CategorySchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Category', CategorySchema);