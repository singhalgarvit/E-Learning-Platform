import React, { useContext } from 'react'
import { BiLoaderAlt } from "react-icons/bi";
import '../styles/loading.css'
import { LoadingContext } from '../context/loadingContext';

function Loading() {
    const {loading} = useContext(LoadingContext)
  return (
    loading&&
    <div className='loaderContainer'>
        <BiLoaderAlt className='loader'/>
    </div>
  )
}

export default Loading