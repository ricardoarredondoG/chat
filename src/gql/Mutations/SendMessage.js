import {gql} from "@apollo/client";

export const sendMessageGQL = gql`
mutation sendMessage ($messageData: MessageInput!){
    sendMessage(messageData: $messageData ){
      message{
        content
        id
      }
    }
  }
`;
