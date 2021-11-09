import React from 'react'
import * as Yup from 'yup'
import {Formik,Form, Field,ErrorMessage} from 'formik'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { useHistory } from 'react-router'



function Create() {
    const history = useHistory()
   const initialValues = {
       title: "",
       postText: "",
       username: "",
   }
   const validationSchema = Yup.object().shape({
       title: Yup.string().required(),
       postText: Yup.string().required(),
       username: Yup.string().min(3,"Please enter more than 3 characters!").max(34).required()
   })
   const submitHandler = (data) => {
        axios.post("http://localhost:3001/posts",data).then((res) => {
            console.log("Blue fish")
            history.push("/posts")
        })

   }
    return (
        <div className="postContent m-auto">
            <Formik initialValues={initialValues} onSubmit={submitHandler} validationSchema={validationSchema}>
                <Form className="container mt-3">
                    <label>Title: &nbsp;</label>
                    <ErrorMessage name="title" component="small" /><br />
                    <Field className="m-2" id="createInput" name="title" placeholder="title of the post..."/><br/>
                    <label>Post: &nbsp;</label>
                    <ErrorMessage name="postText" component="small" /><br />
                    <Field className="m-2" as="textarea" id="createPostText" name="postText" placeholder="body of the post..."/><br/>
                    <label>Username: &nbsp;</label>
                    <ErrorMessage name="username" component="small" /><br />
                    <Field autocomplete='off' className="m-2" id="createUsername" name="username" placeholder="username"/><br/>
                    <button type="submit" className="btn btn-success">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Create
