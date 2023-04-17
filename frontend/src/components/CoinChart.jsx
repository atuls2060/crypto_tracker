import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { CryptoContext } from '../Contexts/CryptoContext';
import { Box, Button, Flex, HStack, Spinner } from '@chakra-ui/react';

const CoinChart = ({ id }) => {
  const [coinData, setCoinData] = useState([]);
  const { currency } = useContext(CryptoContext)
  const [loading, setLoading] = useState(false)
  const [days, setDays] = useState("1")


  const fetchPrices = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      //prices with timestamp--> const data[0]
      const data = response.data.prices;
      setCoinData(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchPrices();
  }, [currency, days]);


  const data = {
    labels: coinData.map((coin) => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === "1" ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `${id[0].toUpperCase()}${id.substr(1)} Price (Past ${days}) in ${currency.toUpperCase()}`,
        data: coinData.map((coin) => coin[1]),
        borderColor: '#4caf50',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div>
      {
        loading ? <Flex height="100%" justifyContent="center" alignItems="center">
          <Spinner size="xl" />
        </Flex> :
          <Box>
            <Line data={data} options={options} />
            <HStack mt="40px" justifyContent="space-between">
              <Button onClick={() => setDays("1")} variant={days === "1" ? "solid" : "outline"}>24 Hours</Button>
              <Button onClick={() => setDays("30")} variant={days === "30" ? "solid" : "outline"}>30 Days</Button>
              <Button onClick={() => setDays("90")} variant={days === "90" ? "solid" : "outline"}>3 Months</Button>
              <Button onClick={() => setDays("180")} variant={days === "180" ? "solid" : "outline"}>6 Months</Button>
              <Button onClick={() => setDays("365")} variant={days === "365" ? "solid" : "outline"}>1 Year</Button>
            </HStack>
          </Box>
      }
    </div>
  );
};

export default CoinChart;
