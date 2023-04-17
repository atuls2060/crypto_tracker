import React, { useContext, useEffect, useState } from 'react'
import { Box, Container, HStack, Heading, Input, Select, Spinner, Table, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import axios from 'axios';
import { CryptoContext } from '../Contexts/CryptoContext';
import Pagination from '../components/Pagination';
import TableRow from '../components/TableRow';
import TopHeader from '../components/TopHeader';

const HomePage = () => {
  const { currency } = useContext(CryptoContext)
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("market_cap_desc");

  const getData = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params: {
          vs_currency: currency,
          order: sortBy,
          sparkline: false
        }
      })
      setData(data)
      setLoading(false)
    } catch (error) {
      console.log("error", error)
      setLoading(false)
    }
  }

  const showSearchResult = () => {
    return data.filter((item) => {
      return item.name.toLowerCase().includes(search.toLocaleLowerCase())
    })
  }

  useEffect(() => {
    getData()
  }, [currency, sortBy])

  return (
    <Container maxW={{ base: "100%", md: "90%", lg: "80%" }}>
      <TopHeader />
      <VStack align="stretch" p="20px" spacing="20px">
        <HStack spacing="25px">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" />
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} placeholder='Sort by Market Cap'>
            <option value="market_cap_desc">DESC</option>
            <option value="market_cap_asc">ASC</option>
          </Select>
        </HStack>
        <Box overflowX="scroll"
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}>

          {
            loading ? <Box minH="80vh" display="flex" justifyContent="center" alignItems="center"><Spinner size="xl" /></Box> :
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
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    showSearchResult().slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10)
                      .map((coin) => {
                        return <TableRow key={coin.id}  {...coin} />
                      })
                  }
                </Tbody>
              </Table>}
        </Box>
        <Pagination currentPage={currentPage} totalPages={parseInt(data.length / 10)} onPageChange={(page) => setCurrentPage(page)} />
      </VStack>
    </Container>
  )
}

export default HomePage