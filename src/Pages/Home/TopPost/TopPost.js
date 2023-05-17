import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import Post from "../Post/Post";

const TopPost = () => {
  const {user} = useContext(AuthContext);

  const { data: topPost = [], refetch, isLoading } = useQuery({
  queryKey: ["topPost", user ],
  queryFn: async () => {
    const res = await fetch(`https://social-media-site-server.vercel.app/top-posts`, {
      headers: {
        authorization: `${localStorage.getItem("token")}`,
    }
    })
    const data = await res.json();
     data.sort(function (a, b) {  return b.like-a.like });
    return data;
  },
});
  return (
    <div className="top-post pt-5 px-2 md:px-0">
      {topPost?.slice(0,3).map((post)=><Post refetch={refetch} key={post._id} data={post}></Post>)}
    </div>
  );
};

export default TopPost;
