import React, { useContext, useState } from 'react'
import { Box, Button, Card, CardBody, CardHeader, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement, Text, VStack, useToast } from '@chakra-ui/react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { AuthContext } from '../Contexts/AuthContext'
import { Link, Navigate } from 'react-router-dom'
import { loginUser } from '../utils/api'

const LoginPage = () => {
    const { isLoggedIn, setLoggedInUser } = useContext(AuthContext)
    const [isInvalid, setIsInvalid] = useState({
        email: false,
        password: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [anyError, setAnyError] = useState(false)
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [loading, setIsLoading] = useState(false)
    const toast = useToast()

    const handleLogin = async () => {
        //Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = userData.email.match(emailRegex)

        setIsInvalid((prev) => {
            return { ...prev, email: userData.email === "" || !isValidEmail, password: userData.password === "" || userData.password.length < 6 }
        })

        //check if any field is incorrect
        setAnyError(Object.values(isInvalid).some((val) => val))
        if (anyError || !isValidEmail || userData.password.length < 6) {
            return
        }


        setIsLoading(true)
        try {
            const { data } = await loginUser(userData)
            toast({
                title: "Logged In Successfully!",
                status: "success",
                position: "top",
                duration: "1000",
                isClosable: true
            })
            setIsLoading(false)
            setLoggedInUser(data)
        } catch (error) {
            const message = error.response?.data?.message
            toast({
                title: message,
                status: "error",
                position: "top",
                duration: "1000",
                isClosable: true
            })
            setIsLoading(false)
        }
    }

    const handlerChange = (key, value) => {
        setUserData((prev) => {
            return { ...prev, [key]: value }
        })

        setIsInvalid((prev) => {
            return { ...prev, [key]: value !== "" ? false : isInvalid[key] }
        })


    }

    if (isLoggedIn) {
        return <Navigate to="/" />
    }


    return (
        <Container mt="50px">
            <Card>
                <CardHeader>
                    <Heading textAlign="center" size="md">
                        Login
                    </Heading>
                </CardHeader>
                <CardBody>
                    <VStack spacing="10px">
                        <FormControl isInvalid={isInvalid.email} isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input value={userData.email} onChange={(e) => handlerChange("email", e.target.value)} type='email' placeholder='Email' />
                            {userData.email !== "" ? <FormErrorMessage>Email is incorrect</FormErrorMessage> : <FormErrorMessage>Email is required</FormErrorMessage>}
                        </FormControl>
                        <FormControl isInvalid={isInvalid.password} isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input value={userData.password} onChange={(e) => handlerChange("password", e.target.value)} type={showPassword ? "text" : "password"} placeholder='Password' />
                                <InputRightElement>
                                    <Box cursor="pointer" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            !showPassword ? <AiFillEyeInvisible /> :
                                                <AiFillEye />
                                        }
                                    </Box>
                                </InputRightElement>
                            </InputGroup>
                            {
                                userData.password !== "" ? <FormErrorMessage>Password should be of at least 6 characters </FormErrorMessage> : <FormErrorMessage>Password is required</FormErrorMessage>
                            }
                        </FormControl>
                        <FormControl isInvalid={anyError || isInvalid.email}>
                            <FormErrorMessage>All fields with * are required</FormErrorMessage>
                        </FormControl>
                        <Button isLoading={loading} loadingText="Please wait" onClick={handleLogin} variant="outline">Login</Button>
                        <Text>Don't have Account ? <Link to="/register" style={{ color: "blue" }}>Sign Up</Link></Text>
                    </VStack>
                </CardBody>
            </Card>
        </Container>
    )
}

export default LoginPage