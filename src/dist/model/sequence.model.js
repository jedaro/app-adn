"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequence = void 0;
const database_1 = require("../db/database");
const SequenceSchema = new database_1.mongoose.Schema({
    sequence: {
        type: Array,
        required: true
    },
    isMutant: {
        type: Boolean,
        required: true
    }
}, { collection: 'sequence' });
const Sequence = database_1.mongoose.model('Sequence', SequenceSchema);
exports.Sequence = Sequence;
