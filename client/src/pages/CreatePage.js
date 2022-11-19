import React, {useContext, useState,useEffect} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import "../index.css"
const CreatePage = () => {
    const history = useNavigate()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] =  useState('')

    useEffect(()=>{
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event =>{
        if(event.key === 'Enter'){
            try{
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history(`/detail/${data.link._id}`)
            }
            catch (e) {}
        }
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        className="createPageInput"
                        id="link"
                        type="text"
                        value={link}
                        onChange={e=>setLink(e.target.value)}
                        onKeyDown={pressHandler}
                    />
                    <label htmlFor="link" className="createPageLabel">Enter a link</label>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;