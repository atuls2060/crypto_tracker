import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Avatar, Box, Container, Img, Text, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CryptoContext } from "../Contexts/CryptoContext";

const SlideShow = ({ coins }) => {
    const { currency } = useContext(CryptoContext)
    const navigate = useNavigate()
    let settings = {
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 0,
        slidesToShow: 4,
        slidesToScroll: 1,
        pauseOnHover: true,
        cssEase: "linear"
    }


    return (
        <Container my="30px" p={0} maxW="100%" >
            <Slider {...settings}>
                {
                    coins.map((coin) => {
                        return <Link key={coin.id} onClick={() => navigate(`/cryptodetail/${coin.id}`)} >
                            <VStack spacing="15px" color="white">
                                <Avatar bg="rgba(0,0,0,.3)" size="lg" p='10px' src={coin.image} />
                                 <Text>{coin.symbol.toUpperCase()}</Text>
                                <Text fontSize="18px">{coin.current_price.toLocaleString('en-US', { style: 'currency', currency })}</Text>
                            </VStack>
                        </Link>
                    })
                }
            </Slider>
        </Container>
    );
};
export default SlideShow