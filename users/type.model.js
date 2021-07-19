const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Name : { type: String, unique: true},
    members : [{
        type: mongoose.Schema.Type.ObjectId,
    }],
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Type', schema);