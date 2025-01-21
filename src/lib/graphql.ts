import { gql } from "@apollo/client";

const GET_NOTES = gql`
query getNotes($userId: String!){
    getNotes(userId: $userId){
    id
    userId
    title
    content
    }
}
`;


const CREATE_NOTE = gql`
mutation createNote($userId:String!, $title: String!, $content: String!){createNote(userId: $userId, title: $title, content: $content){
    id
    userId
    title
    content
    }
    }
    `;

const UPDATE_NOTE = gql`
mutation updateNote($id: ID!, $title: String!, $content: String!){updateNote(id: $id, title: $title, content: $content){
    id
    userId
    title
    content
    }
    }
    `;


const DELETE_NOTE = gql`
mutation deleteNote($id: ID!){
    deleteNote(id: $id)
}
`;

export { GET_NOTES, CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE };