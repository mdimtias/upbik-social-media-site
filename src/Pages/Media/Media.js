import { useQuery } from "@tanstack/react-query";
import React from "react";
import Post from "../Home/Post/Post";

const Media = () => {
  const {
    data: allPost = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allPost"],
    queryFn: async () => {
      const res = await fetch(
        `https://social-media-site-server.vercel.app/posts`,
        {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      return data.reverse();
    },
  });
  return (
    <div className="media-section">
      <div className="container mx-auto">
        <div className="top-post pt-5 px-2 md:px-0">
          {allPost?.map((post) => (
            <Post refetch={refetch} key={post._id} data={post}></Post>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media;
