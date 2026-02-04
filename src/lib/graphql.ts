const GRAPHQL_ENDPOINT = 'https://aijeju.co.kr/graphql';

export const GET_POSTS = `
  query GetPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          excerpt
          slug
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          content
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      date
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

export async function requestPosts<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const { GraphQLClient } = await import('graphql-request');
  const client = new GraphQLClient(GRAPHQL_ENDPOINT);
  return client.request<T>(query, variables);
}
