import React from 'react'
const Pagination = ({postsPerPage,totalPosts,paginate}) => {
    const pageNumbers=[];
    for(let i=1;i<=Math.ceil(totalPosts/postsPerPage);i++){
        pageNumbers.push(i);
    }
    return (
        <>
            <footer>
            <button disabled>&larr;</button>
            {pageNumbers.map((ele)=>{
                return (<button onClick={()=>paginate(ele)} key={ele}>{ele}</button>)
            })}
            <button disabled>&rarr;</button>
            </footer>
        </>
    )
}

export default Pagination