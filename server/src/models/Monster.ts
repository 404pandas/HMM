import { Schema, model, Document } from "mongoose";

// Define an interface for the Monster document
interface IMonster extends Document {
  name: string;
  strength: number;
  speed: number;
  description: string;
  rarity: number;
  image: string;
  createdAt: Date;
}

// Define the schema
const monsterSchema = new Schema<IMonster>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    strength: {
      type: Number,
      required: true,
      default: () => Math.floor(Math.random() * 100) + 1,
    },
    speed: {
      type: Number,
      required: true,
      default: () => Math.floor(Math.random() * 100) + 1,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    rarity: {
      type: Number,
      required: true,
      default: () => Math.floor(Math.random() * 10) + 1,
    },
    image: {
      type: String,
      required: true,
      default: () =>
        `https://github.com/diwashrestha/WitcherAPI/blob/master/image/character/Geralt_of_Rivia.png?raw=true`,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Monster = model<IMonster>("Monster", monsterSchema);

export default Monster;
