import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AddGalleryCard from './AddGalleryCard';
import Home from './Home';
import CardDetails from './CardDetails';
import UpdateCard from './UpdateCard';
import ErrorPage from './ErrorPage';
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/new' element={<AddGalleryCard/>}/>
        <Route path='/show/:id' element={<CardDetails/>}/>
        <Route path='/:id/edit' element={<UpdateCard/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </>
  )
}

export default App