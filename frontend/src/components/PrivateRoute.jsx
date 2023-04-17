import React, { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext)
  const toast = useToast();

  if (!isLoggedIn) {
    toast({
      title: "Login First",
      status: "info",
      position: "top",
      isClosable: true,
      duration: 1000
    })
    return <Navigate to="/login" />
  }

  return children
}

export default PrivateRoute