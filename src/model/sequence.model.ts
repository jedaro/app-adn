import {mongoose} from '../db/database'

const SequenceSchema = new mongoose.Schema(
    {
        sequence:{
            type: Array,
            required:true
        },
        isMutant:{
            type:Boolean,
            required: true
        }
    },{ collection: 'sequence' }
);

const Sequence = mongoose.model('Sequence', SequenceSchema)

export{Sequence}