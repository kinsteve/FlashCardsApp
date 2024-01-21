import {Schema , Types , model , Document} from 'mongoose';

const ObjectId = Types.ObjectId;


export interface Deck {
    title: string;
    // Add other fields if present in your schema
}

export type DeckDocument = Deck & Document;

const DeckSchema = new Schema<DeckDocument>({
    title : {
        type: String,
        // required : [true , "Title is required"],
    }
})


const DeckModel = model<DeckDocument>('Deck',DeckSchema);

export default DeckModel;

