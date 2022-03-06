import {gql} from "@apollo/client";

export const getUsersGQL = gql`
query{
    allUser{
      id
      nickname
    }
  }
`;
