import React, { useEffect, useState } from 'react'
import { Button, Container, Flex, Heading, Spinner, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { getWatchList } from '../utils/api';
import TableRow from '../components/TableRow'

const WatchListPage = () => {
  const [loading, setLoading] = useState(true);
  const [watchList, setWatchList] = useState([])

  const getData = async () => {
    setLoading(true)
    try {
      const { data } = await getWatchList()
      setLoading(false)
      setWatchList(data)
    } catch (error) {
      console.log("error", error)
      setLoading(false)
    }
  }
  const removeDeletedRow = (id) => {
    setWatchList(watchList.filter((coin) => coin.id !== id))
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <Container my="40px" maxW={{ base: "100%", md: "90%", lg: "80%" }}>
      {
        loading ?
          <Flex justifyContent="center" alignItems="center" minH="60vh">
            <Spinner size="xl" />
          </Flex> : watchList.length === 0 ?
            <Flex flexDirection="column" gap="40px" justifyContent="center" alignItems="center" minH="60vh">
              <Heading color="gray" >Nothing in your Watchlist!</Heading>
              <Link to="/"> <Button variant="outline">Browse Currency</Button></Link>
            </Flex> :
            <Table>
              <Thead>
                <Tr>
                  <Th>
                    Coin
                  </Th>
                  <Th>
                    Symbol
                  </Th>
                  <Th>
                    Price
                  </Th>
                  <Th>
                    24H Change
                  </Th>
                  <Th>
                    Market Cap
                  </Th>
                  <Th>
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  watchList.map((coin) => {
                    return <TableRow key={coin.id} isWatchListRow={true} removeDeletedRow={removeDeletedRow} {...coin} />
                  })
                }
              </Tbody>
            </Table>
      }
    </Container>
  )
}

export default WatchListPage