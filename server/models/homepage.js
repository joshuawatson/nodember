/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../config/config'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/**
 * Article Schema
 */
var HomepageSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    pageContent: {
        type: Object,
        default: {}
    },
    homepageTemplateName: {
        type: String,
        default: '',
        trim: true
    },
    urlSegment: {
        type: String,
        default: '',
        trim: true
    },
    template: {
        type: Schema.ObjectId,
        ref: 'Template'
    },
    vendor: {
        type: Schema.ObjectId,
        ref: 'Vendor'
    },
    // user: {
    //     type: Schema.ObjectId,
    //     ref: 'User'
    // },
    id: {
        type: ObjectId,
        trim: true
    }
}, {
    versionKey: false,
    id: true
});

/**
 * Validations
 */
HomepageSchema.path('name').validate(function(name) {
    return name.length;
}, 'name cannot be blank');

/**
 * Statics
 */

HomepageSchema.statics = {
    // Load static finds by id, populates user nested object
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'name username').exec(cb);
    },
    // query static finds by other query params, populates user nested object
    query: function(query, cb) {
        this.findOne(query).populate('user', 'name username').exec(cb);
    }
};

mongoose.model('Homepage', HomepageSchema);
