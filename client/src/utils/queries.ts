import { gql } from "@apollo/client";

export const GET_MONSTERS = gql`
  query GetMonsters {
    monsters {
      id
      name
      image
      strength
      speed
      description
      rarity
    }
  }
`;
