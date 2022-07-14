import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const UpdateCard = () => {
    const navigate=useNavigate();
    const {id}=useParams();
    const [dbName,setDBName]=useState({
        ImgName:"",
        ImgUrl:"",
        ImgDetails:""
    });
    const getImgName=async ()=>{
        try{
            const getName=await fetch(`http://localhost:5000/${id}/edit`,{
                method:'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const jsonData=await getName.json();
            setDBName(jsonData)
        }catch(err){
            alert(err);
        }
    }
    useEffect(()=>{
        getImgName();
    },[])
    const modifyData=async (e)=>{
        e.preventDefault();
        const {ImgUrl,ImgDetails}=dbName;
        try{
            const findData=await fetch(`http://localhost:5000/${id}/edit`,{
                method:'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({ImgUrl,ImgDetails})
            })
            if(findData){
                alert("Data has been updated successfully!");
                navigate('/')
            }
            else
                alert("Data has not been updated for some reason!");
        }catch(err){
            alert(err);
        }
    }
    const inputEvent=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setDBName({...dbName,[name]:value})
    }
    return (
        <>
            <div className="updateCard">
                <h1>Update Gallery Card</h1>
                <div className="uptoCard">
                    <form method='PUT'>
                        <input type="text" placeholder='Update Image Name' name='ImgName' onChange={inputEvent} value={dbName.ImgName} disabled/>
                        <input type="text" placeholder='Update Image Url' name='ImgUrl' onChange={inputEvent} value={dbName.ImgUrl}/>
                        <textarea id="" cols="30" rows="7" placeholder='Update Message' name='ImgDetails' onChange={inputEvent} value={dbName.ImgDetails}></textarea>
                        <button onClick={modifyData}>Modify</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateCard