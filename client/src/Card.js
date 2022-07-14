import React from 'react'
import { Link } from 'react-router-dom';
import './index.css'
const Card = (props) => {
  const detail=props.ImgDetails;
  const spliced=detail.substr(0,230);
  const url=`/show/${props.id}`
  return (
    <>
        <div className="card" style={{cursor:'pointer'}}>
            {/* <h1>{props.id}</h1> */}
            <Link to={url}><img src={props.ImgUrl} alt="img"/></Link>
            <div className="cardDesc">
            <Link to={url} style={{textDecoration:'none',color:'black'}}><h1>{props.ImgName}</h1></Link>
              <p style={{marginTop:'10px'}}>{spliced} ...</p>
            </div>
          </div>
    </>
  )
}

export default Card