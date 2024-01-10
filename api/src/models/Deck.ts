import mongoose, { Models } from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema({
    title : {
        type: String,
        // required : [true , "Title is required"],
    }
})


const DeckModel = mongoose.model('Deck',DeckSchema);

export default DeckModel;