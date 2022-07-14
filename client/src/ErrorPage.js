import React from 'react'
import { Link } from 'react-router-dom'
import ErrorImg from './errorimg.png'
const ErrorPage = () => {
  return (
    <>
        <div className="errorContainer">
            <div className="errorContent">
                <img src={ErrorImg} alt="img" />
                <h1>Please Press <Link to='/'>Back</Link> To Go To Homepage.</h1>
            </div>
        </div>
    </>
  )
}

export default ErrorPage