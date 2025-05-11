import { Monster } from "../models/index.js";

const resolvers = {
  Query: {
    monsters: async () => {
      return await Monster.find().sort({ name: 1 });
    },
  },
};

export default resolvers;
