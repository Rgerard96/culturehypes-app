import { gql } from '@apollo/client';

export const typeDefs = gql`
  
  type User{
    id: ID!
    email: String!
  }
  
  type Note {
    id: ID!
    userId: String!
    title: String!
    content: String!
    createdAt: String!
    updatedAt: String
  } 

  type Query{
    getNotes(userId: String!): [Note]
    getNote(id: ID!): Note
  }

  type Mutation{
    createNote(
      userId: String!
      title: String!
      content: String!
    ): Note

    updateNote(
      id: ID!
      title: String!
      content: String!
    ): Note

    deleteNote(
      id: ID!
    ): String!
  }
`;