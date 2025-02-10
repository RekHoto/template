import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      data {
        id
        title
      }
    }
  }
`;

interface Post {
  id: string;
  title: string;
}

interface GetPosts {
  posts: {
    data: Post[];
  };
}

const PostsList: React.FC = () => {
  const { loading, error, data } = useQuery<GetPosts>(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data?.posts.data.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> (ID: {post.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
