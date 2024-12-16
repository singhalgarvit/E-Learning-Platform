import React from 'react'
import { Link, Route, Routes,Outlet } from 'react-router-dom'

function Admin() {
  return (
    <>
      <Link to="/admin/dashboard">Dashboard</Link>
      <Outlet/>
    </>
  )
}

export default Admin