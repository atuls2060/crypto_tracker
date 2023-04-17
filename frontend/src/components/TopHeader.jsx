import React, { useContext, useEffect, useState } from 'react'
import bgImg from "../images/bg.jpg"
import SlideShow from './SlideShow'
import axios from 'axios'
import { CryptoContext } from '../Contexts/CryptoContext'
import { Box, Heading, Img } from '@chakra-ui/react'

const TopHeader = () => {
    const { currency } = useContext(CryptoContext)
    const [coins, setCoins] = useState([])

    const getTrending = async () => {
        try {
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
            setCoins(data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getTrending()
    }, [])

    return <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" position="relative" height={{ base: "270px", md: "400px" }} p="20px" my="40px">
        <Img left="0" zIndex="-1" position="absolute" src={bgImg} height="100%" w="100%" />
        <Heading  mt={{base:"30px",md:"0px"}} color="white" textAlign="center">Trending Crypto Currency</Heading>
        <SlideShow coins={coins} />
    </Box>
}

export default TopHeader