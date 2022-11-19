import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email:'',password:''
    })

    useEffect(()=>{
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(()=>{
        window.M.updateTextFields()
    }, [])

    const changeHandler = event =>{
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data', data)
        }
        catch (e) {

        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        }
        catch (e) {

        }
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Make URL shorter!</h1>
                <div className="card green darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input
                                       id="email"
                                       type="text"
                                       name="email"
                                       className="darkgreen-input"
                                       value={form.email}
                                       onChange={changeHandler}
                                />
                                    <label htmlFor="email" className="AuthPageLabel">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                       id="password"
                                       type="password"
                                       name="password"
                                       className="darkgreen-input"
                                       value={form.password}
                                       onChange={changeHandler}
                                />
                                    <label htmlFor="password" className="AuthPageLabel">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                      <button
                          className="btn yellow darken-4"
                          style={{marginRight: 10}}
                          disabled={loading}
                          onClick={loginHandler}
                      >
                          Sign in
                      </button>
                      <button
                          className="btn orange lighten-1"
                          onClick={registerHandler}
                          disabled={loading}
                      >
                          Sign up
                      </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;