import React, { useContext } from 'react'
import { HStack, Td, Tr, Text, Img, IconButton, useToast } from '@chakra-ui/react'
import { BiX } from "react-icons/bi"
import { CryptoContext } from '../Contexts/CryptoContext'
import { useNavigate } from 'react-router-dom'
import { deleteFromWatchList } from '../utils/api'

const TableRow = ({ id, name, image, symbol, current_price, market_cap_change_percentage_24h, market_cap, isWatchListRow = false, removeDeletedRow }) => {
  const toast = useToast()
  const { currency } = useContext(CryptoContext)
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cryptodetail/${id}`)
  }
  const handleDelete = async (e) => {
    e.stopPropagation()

    try {
      await deleteFromWatchList(id)
      toast({
        title: "Deleted Successfully!",
        status: "success",
        position: "top",
        duration: "1000",
        isClosable: true
      })
      removeDeletedRow(id)
    } catch (error) {
      const message = error.response?.data?.message
      toast({
        title: message,
        status: "error",
        position: "top",
        duration: "1000",
        isClosable: true
      })
    }
  }

  return (
    <Tr onClick={handleClick} cursor="pointer" _hover={{ bg: "darkBlack" }}>
      <Td>
        <HStack spacing="25px">
          <Img src={image} alt={name} w="60px" />
          <Text>
            {name}
          </Text>
        </HStack>
      </Td>
      <Td>
        <Text fontSize="10px">
          {symbol.toUpperCase()}
        </Text>
      </Td>
      <Td>{current_price.toLocaleString('en-US', { style: 'currency', currency })}</Td>
      <Td>
        <Text color={market_cap_change_percentage_24h < 0 ? "Red" : "green"}>
          {
            market_cap_change_percentage_24h > 0 && "+"
          }
          {
            market_cap_change_percentage_24h.toFixed(2)
          } %
        </Text>
      </Td>
      <Td>{market_cap.toLocaleString('en-US', { style: 'currency', currency })}</Td>
      {
        isWatchListRow && <Td>
          <IconButton onClick={handleDelete} icon={<BiX color='red' />} />
        </Td>
      }
    </Tr >
  )
}

export default TableRow