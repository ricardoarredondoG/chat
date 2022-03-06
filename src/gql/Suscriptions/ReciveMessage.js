import {gql} from "@apollo/client";

export const suscribeMessage = gql`
    subscription{
      recibeMessage(chatroom:"1"){
        messagereceived{
          id
          content
          usuarioEnvia{
            id
            nickname
          }
        }
      }
    }
`;