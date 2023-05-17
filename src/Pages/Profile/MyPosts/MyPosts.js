import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import CreatePost from '../../Home/CreatePost/CreatePost';
import Post from '../../Home/Post/Post';

const MyPosts = () => {
    const {user} = useContext(AuthContext);
    // const [myPost, setMyPost] = useState([]);
    // useEffect(() => {
    //   fetch(`https://social-media-site-server.vercel.app/posts/${user?.email}`, {
    //     authorization: `token ${localStorage.getItem("token")}`,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => setMyPost(data.reverse()));
    // }, [user, setMyPost]);

    const { data: myPost = [], refetch, isLoading } = useQuery({
    queryKey: ["myPost", user ],
    queryFn: async () => {
      const res = await fetch(`https://social-media-site-server.vercel.app/posts/${user?.email}`, {
            authorization: `token ${localStorage.getItem("token")}`,
      })
      const data = await res.json();
      return data.reverse();
    },
  });

    return (
        <div className="top-post pt-5 px-2 md:px-0">
          {myPost.length === 0 && <div className="container mx-auto font-bold text-center text-xl">You have no post <CreatePost></CreatePost> </div>}
          {/* {myPost.length === 0 && "You have no post"} */}
            {myPost.map((post)=><Post refetch={refetch} key={post._id} data={post}></Post>)}
        </div>
    );
};

export default MyPosts;