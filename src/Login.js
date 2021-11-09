import React, { useEffect, useState,useContext } from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as Yup from 'yup'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {AuthContext} from "./Helper/AuthContext"


function Login() {
    const [loginData,setLoginData] = useState()
    const history = useHistory()
    const render = sessionStorage.getItem("accessToken")
    const {setAuthState} = useContext(AuthContext)


    const initialvalues = {
        username: "",
        password: "",
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required()
    })

    useEffect(() => {
        if(render){
            history.push("/")
        }
    },[render])

    const submitHandler =(data) => {
        axios.post("http://localhost:3001/auth/login",data).then((res) => {
            sessionStorage.setItem("accessToken",res.data.accessToken)
            if(sessionStorage.getItem("accessToken" === true)){
                setAuthState(true)
                history.push("/")
            }
            else {
                setAuthState(true)
                history.push("/")
            }

        })
    }
    return (
        <div>
            <Formik initialValues={initialvalues} validationSchema={validationSchema} onSubmit={submitHandler} >
                <Form>
                    <div class="container w-25 justify-content-center">
                        <Field name="username" class="form-control mt-3" placeholder="Please input your username..."/>
                        <ErrorMessage name="username" component="small" />
                        <Field name="password" type="password" class="form-control mt-3" placeholder="Please input your password..."/>
                        <ErrorMessage name="password" component="small" /><br/>
                        <button type="submit" className="btn btn-success">Login</button>
                            <div>
                                {loginData && loginData.message}
                            </div>
                    </div>
                </Form>
            </Formik>

        </div>
    )
}

export default Login
