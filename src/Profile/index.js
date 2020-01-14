import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import RepositoryList from "../Repository";
import Loading from "../Loading";

const GET_CURRENT_USER = gql`
  {
    viewer {
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
        edges {
          node {
            id
            name
            url
            descriptionHTML
            primaryLanguage {
              name
            }
            owner {
              login
              url
            }
            stargazers {
              totalCount
            }
            viewerHasStarred
            watchers {
              totalCount
            }
            viewerSubscription
          }
        }
      }
    }
  }
`;

const Profile = () => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading }) => {


      if (!data || loading) {
        return <div> Loading ... </div>;
      }

      const { viewer } = data;
      return <RepositoryList repositories={viewer.repositories} />;
    }}
  </Query>
);

export default Profile;
