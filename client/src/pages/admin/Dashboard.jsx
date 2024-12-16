import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='dashboard'>
      <Link to="/admin/addcourse">Add Course</Link>
    </div>
  )
}

export default Dashboard