import React, { useContext } from 'react'
import { Box, Container, HStack, Heading, IconButton, Select } from '@chakra-ui/react'
import { CryptoContext } from '../Contexts/CryptoContext'
import { Link } from 'react-router-dom'
import { AiOutlineHeart } from 'react-icons/ai'
import ProfileDropDown from './ProfileDropDown'

const Navbar = () => {
  const { currency, setCurrency } = useContext(CryptoContext)
  return (
    <Box bg="darkBlack">
    <Container maxW={{ base: "100%" ,md: "90%", lg: "80%" }}>
    <HStack py="15px" px="20px"justifyContent="space-between">
      <Link  to="/"><Heading  size="md">Crypto Tracker</Heading></Link>
      <HStack>
        <Link to="/watchlist">
          <IconButton
            variant="outline"
            icon={<AiOutlineHeart />}
          />
        </Link>
        <ProfileDropDown />
        <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="inr">INR</option>
          <option value="usd">USD</option>
          <option value="eur">EURO</option>
        </Select>
      </HStack>
    </HStack>
    </Container>
    </Box>
  )
}

export default Navbar