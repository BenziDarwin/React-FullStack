import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {Col, Row} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"



function PostDetails() {
    const [details,setDetails] = useState(null)
    const [comments,setComments] = useState([])
    const [entry, setEntry] = useState('')
    const {id} = useParams()

    useEffect(() => {
        axios.get("http://localhost:3001/posts/byId/"+id).then((res) => {
            setDetails(res.data)
        });
        axios.get("http://localhost:3001/comments/"+id).then((res) => {
            setComments(res.data)
        });
    },[id,entry]);


    const submitHandler = () => {
        axios.post("http://localhost:3001/comments",{commentBody:entry, PostId:id},
        {
            headers:{
                accessToken: sessionStorage.getItem("accessToken")
        }
    })
        .then((res) => {
            setEntry("")
        })
    };
    const commentHandler = (event) => {
        setEntry(event.target.value)
    }
    return (
        <div>
        {details &&
        <Row>
            <Col size="lg mt-3">
                <div id="" className="text-center bg-light border-dark mt-3">
                    <h1>{details.title}</h1>
                    <h4>Written by {details.username}</h4>
                    <h6>{details.postText}</h6>
                </div>
            </Col>
            <Col size="lg">
                <div className="">
                    {comments && comments.map((value,key) => {
                        return(<div key={key} className="comment m-3">
                                <p>{value.commentBody}</p>
                                <h6>{value.username}</h6>
                            </div>)
                    })}


                <textarea value={entry} name="commentBody" className="form-control w-50" onChange={commentHandler} placeholder="Some text..."></textarea><br />
                <button className="btn btn-success" type="submit" onClick={submitHandler}>Add comment</button>
                </div>
            </Col>
        </Row>
        }
        </div>
    )
}

export default PostDetails
