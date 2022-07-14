import React, { useEffect, useState } from 'react'
import './index.css'
import Card from './Card'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'
const Home = () => {
  const [ImgData,setImgData]=useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const [postsPerPage,setPostsPerPage]=useState(9);
  const [searchTerm,SetSearchTerm]=useState('');
  const showPictures=async ()=>{
    const fetchData=await fetch("http://localhost:5000/",{
      method:'GET',
      headers:{
        "Content-Type":"application/json"
      }
    });
    const jsonData=await fetchData.json();
    setImgData(jsonData);
  }
  useEffect(()=>{
    showPictures();
  },[])
  //Get current post
  const indexOfLastPost=currentPage*postsPerPage;
  const indexOfFirstPost=indexOfLastPost-postsPerPage;
  const getCurrentPost=ImgData.slice(indexOfFirstPost,indexOfLastPost);
  const paginate=(pageNumbers)=>{
    setCurrentPage(pageNumbers)
  }
  return (
    <>
      <div className="cardContainer" >
      <div className="searchAndCard">
      <Link to='/new' style={{textDecoration:'none', borderRadius:'10px',backgroundColor:'black', padding:'12px 20px',margin:'0px 20px',color:'white',fontSize:'20px'}}>Add Card</Link>
      <input type="text" placeholder='Search...' onChange={(e)=>SetSearchTerm(e.target.value)} style={{marginTop:'20px',padding:'10px',fontSize:'20px',borderRadius:'10px',border:'none',boxShadow:'1px 1px 5px gray',outline:'none'}}/>
      </div>
      <h1 style={{fontSize:'50px',marginTop:'50px'}}>Gallery Data</h1>
        <div className="cards">
        {getCurrentPost.filter((val)=>{
          if(searchTerm==="")
            return val;
          else if(val.ImgName.toLowerCase().includes(searchTerm.toLowerCase()))
            return val;
        }).map((ele,idx,arr)=>{
          return <Card key={idx} id={ele._id} ImgUrl={ele.ImgUrl} ImgName={ele.ImgName} ImgDetails={ele.ImgDetails}/>
        })}
        </div>
        <Pagination postsPerPage={postsPerPage} totalPosts={ImgData.length} paginate={paginate}/>
      </div>
    </>
  )
}

export default Home;