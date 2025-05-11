const typeDefs = `
 
  type Monster {
    id: ID!
    name: String!
    strength: Int!
    speed: Int!
    description: String!
    rarity: Int!
    image: String!
    createdAt: String!
  }

  type Query {
   monsters: [Monster]
  }

`;

export default typeDefs;
