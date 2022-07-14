import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const CardDetails = () => {
    const { id } = useParams();
    const editPage=`/${id}/edit`;
    const [allData, setAllData] = useState({});
    const navigate=useNavigate();
    const fetchData = async () => {
        const getData = await fetch(`http://localhost:5000/show/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const jsonData = await getData.json();
        console.log(jsonData)
        setAllData(jsonData);
    }
    useEffect(() => {
        fetchData();
    }, [])
    const deleteData=async ()=>{
        try{
            const deletedData=await fetch(`http://localhost:5000/delete/${id}`,{
                method:'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                }
            })
            // const jsonData=await deletedData.json();
            if(deletedData){
                alert("Deletion is successfull");
                navigate('/');
            }
            else
                alert("Deletion is unsuccessfull");
        }catch(err){
            alert(err);
        }
    }
    return (
        <>
            <div className="CardDetails">
                <h1 style={{margin:'20px',fontSize:'45px'}}>Gallery Card Desciption</h1>
                <div className="cardDetail">
                    <img src={allData.ImgUrl} alt="img" />
                    <div className="cardDet">
                        <h1>{allData.ImgName}</h1>
                        <p style={{marginTop:'10px'}}>{allData.ImgDetails}</p>
                    </div>
                    <div className="deleteEditBtn">
                        <button onClick={deleteData}>Delete</button>
                        <Link to={editPage} style={{backgroundColor:'black',padding:'10px',width:'40px',height:'20px',marginRight:'20px',marginTop:'10px',color:'white',textDecoration:'none',fontSize:'20px',borderRadius:'5px',paddingLeft:'20px'}}>Edit</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardDetails