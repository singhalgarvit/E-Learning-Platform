import React from 'react'
import {getRole} from '../utils'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children, allowedRoles}) {
  const role = getRole()

  if(!allowedRoles.includes(role)){
    return  <Navigate to="/"/>
  }

  return children;
}

export default ProtectedRoute