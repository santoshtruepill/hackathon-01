const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contaminationZone = new Schema({
    "lat": {
        type: Number,
        required: true
    },
    "long": {
        type: Number,
        required: true
    },
    "name": {
        type: String,
        required: true,
        trim: true
    },
    "contanment": {
        type: Boolean,
        required: true
    }
});

// Compile model from schema
module.exports = mongoose.model('contaminationZone', contaminationZone);