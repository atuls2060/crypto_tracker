import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Container, Flex, Heading, Img, Spinner, Text, VStack, useBreakpointValue, useToast } from '@chakra-ui/react'
import CoinChart from '../components/CoinChart'
import { Navigate, useParams } from 'react-router-dom'
import { CryptoContext } from '../Contexts/CryptoContext'
import axios from 'axios'
import { addToWatchList } from '../utils/api'
import { AuthContext } from '../Contexts/AuthContext'

const CryptoDetailPage = () => {
    const { isLoggedIn } = useContext(AuthContext)
    const toast = useToast()
    const isMobile = useBreakpointValue({ base: true, lg: false })
    const { id } = useParams()
    const { currency } = useContext(CryptoContext)
    const [coin, setCoin] = useState({})
    const direction = useBreakpointValue({ base: "column", lg: "row" })
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const getDetails = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
            setCoin(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    const handleAdd = async () => {
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
        setIsLoading(true)
        try {
            await addToWatchList(id)
            toast({
                title: "Add to WatchList!",
                status: "success",
                position: "top",
                duration: "1000",
                isClosable: true
            })
            setIsLoading(false)
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

    useEffect(() => {
        getDetails()
    }, [])

    return (
        <Container my="40px" maxW={{ base: "100%", md: "90%", lg: "90%" }}>
            <Flex w="100%" direction={direction} justifyContent="center" alignItems="center" gap="40px" >
                {
                    loading ? <Flex justifyContent="center" alignItems="center" height="80vh">
                        <Spinner size="xl" />
                    </Flex> :
                        <VStack align="stretch" spacing="40px" width={isMobile ? "100%" : "40%"}>
                            <VStack>
                                <Img src={coin.image?.large} alt={coin.name} />
                                <Heading>{coin.name}</Heading>
                                <Text fontSize="18px">{coin.description?.en.split(".")[0]}</Text>
                            </VStack>
                            <VStack align="stretch" spacing="20px">
                                <Heading size="md">
                                    Rank : {coin.market_cap_rank}
                                </Heading>
                                <Heading size="md">
                                    Current Price : {coin.market_data?.current_price[currency].toLocaleString('en-US', { style: 'currency', currency })}
                                </Heading>
                                <Heading size="md">
                                    Market Cap : {coin.market_data?.market_cap[currency].toLocaleString('en-US', { style: 'currency', currency })}
                                </Heading>
                                <Button isLoading={isLoading} loadingText="Adding..." onClick={handleAdd}>Add To Watchlist</Button>
                            </VStack>
                        </VStack>
                }
                <Box width={isMobile ? "100%" : "58%"}>
                    <CoinChart id={id} />
                </Box>
            </Flex>
        </Container>
    )
}

export default CryptoDetailPage

