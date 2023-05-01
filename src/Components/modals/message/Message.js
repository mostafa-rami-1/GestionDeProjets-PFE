import React from 'react'
import successImg from  '../../../assets/success.png'
import failImg from '../../../assets/fail.png'
import './msg.css'
const MessageApi = ({ msg, success }) => {

  return (
    <div className='msg'>
          <p className={success ? 'msg-success' : 'msg-fail'}>{msg}</p> 
          <img src={success?successImg:failImg} />
    </div>
  )
}


export default MessageApi