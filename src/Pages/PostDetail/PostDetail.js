import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import Post from '../Home/Post/Post';

const PostDetail = () => {
    const {id} = useParams();
    
    const { data: post = [], refetch, isLoading } = useQuery({
        queryKey: ["myPost", id ],
        queryFn: async () => {
          const res = await fetch(`https://social-media-site-server.vercel.app/post/${id}`, {
                authorization: `token ${localStorage.getItem("token")}`,
          })
          const data = await res.json();
          return data.reverse();
        },
      });

    return (
        <div>
            <Post data={post[0]} refetch={refetch} hideButton="true"></Post>
        </div>
        
    );
};

export default PostDetail;