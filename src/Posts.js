import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom';


const Posts = () => {
    const [posts,setPosts] = useState([])
    const {id} = useParams()
    const history = useHistory()

    useEffect(() => {
       axios.get("http://127.0.0.1:3001/posts").then((res) => {
         setPosts(res.data)
       });
       axios.get("http://127.0.0.1:3001/auth").then((res) => {
         setPosts(res.data)
       });
     },[])


     return (
       <div >
         {posts.map((value) => {
           return (
              <div className="Post" key={value.id} onClick={() => {history.push(`/posts/${value.id}`)}}>
              <h1 className="title">{value.title}</h1>
              <p className="text">{value.postText}</p>
              <h5 className="username">{value.username}</h5>
              </div>

           )
         })}
       </div>
     );
   }

export default Posts
