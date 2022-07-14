import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'
const AddGalleryCard = () => {
    const navigate=useNavigate();
    const [ImgData,setImgData]=useState({
        ImgName:"",
        ImgUrl:"",
        ImgDetails:""
    })
    const inputData=(e)=>{
        const name=e.target.name;
        const val=e.target.value;
        setImgData({...ImgData,[name]:val})
    }
    const submitData=async (e)=>{
        e.preventDefault();
        const {ImgName,ImgUrl,ImgDetails}=ImgData;
        try{
            if(!ImgName || !ImgUrl || !ImgDetails)
                return alert("Please fill all the data!")
            const postData=await fetch("http://localhost:5000/",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({ImgName,ImgUrl,ImgDetails})
            })
            // console.log(postData)
            if(postData){
                alert("Data has been saved");
                setImgData({
                    ImgName:"",
                    ImgUrl:"",
                    ImgDetails:""
                })
                navigate('/');
            }
            else    
                alert("Data is not saved");
        }catch(err){
            alert(err);
        }
    }
    return (
    <>
        <div className="galleryCard">
            <h1>Add Gallery Card Data</h1>
            <div className="galCards">
                <form method='POST'>
                    <input type="text" placeholder='Enter Image Name' onChange={inputData} name="ImgName" value={ImgData.ImgName}/>
                    <input type="text" placeholder='Enter Image Url' onChange={inputData} name="ImgUrl" value={ImgData.ImgUrl}/>
                    <textarea id="" cols="30" rows="7" placeholder='Enter Image Details' onChange={inputData} name="ImgDetails" value={ImgData.ImgDetails}></textarea>
                    <button onClick={submitData}>Submit</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default AddGalleryCard