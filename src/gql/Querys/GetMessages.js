import {gql} from "@apollo/client";

export const getMessageGQL = gql`
query{allMessagesBySala(salaId:1){
      id
      content
      usuarioEnvia{
        id
        nickname
      }
    }
  }
`;
