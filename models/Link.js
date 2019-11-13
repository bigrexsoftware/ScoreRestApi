const mongoose = require('mongoose');
const slugify = require('slugify');

const LinkSchema = new mongoose.Schema(
    {
        sortOrder: {
            type: String,
            trim: true,
            maxLength: [5, 'Sort Order can not be more than five characters']
        },
        url: {
            type: String,
            trim: true,
            maxLength: [1000, 'URL can not be more than 1,000 characters']
        },
        title: {
            type: String,
            require: [true, 'Please add a title'],
            trim: true,
            maxLength: [80, 'Title can not be more than 80 characters']
        },
        slug: String,
        author: {
            type: String,
            trim: true,
            maxLength: [80, 'Author can not be more than 80 characters']
        },
        description: {
            type: String,
            trim: true,
            maxLength: [300, 'Description can not be more than 300 characters']
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            require: true
        }
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
)

// Create bootcamp slug from the name
LinkSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

module.exports = mongoose.model('Link', LinkSchema);