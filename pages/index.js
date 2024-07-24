import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from "@/componets/Property";

const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkname, imageUrl }) => (
  <Flex flexDirection="column" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
      <Text fontSize="3xl" fontWeight="bold">{title1}<br />{title2}</Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">{desc1}<br />{desc2}</Text>
      <Link href={linkname}>
        <Button fontSize="xl">
          {buttonText}
        </Button>
      </Link>
    </Box>
  </Flex>
);

export default function Home({propertiesForRent, propertiesForSale}) {
  console.log(propertiesForRent, propertiesForSale); 
  return (
    <Box>
      <Banner
        purpose="Compra una Vivienda"
        title1="Encuentra, Compra  Y Se dueño"
        title2=" De tu nuevo Hogar"
        desc1=" Explora Apartamentos, Casas"
        desc2=" y mas!"
        buttonText=" Explora Las viviendas en venta"
        linkname="/search?purpose=for-buying"
        imageUrl="https://multimedia.metrocuadrado.com/2671-M4894528/2671-M4894528_36_h.jpg"
      />
      <Flex flexWrap= 'wrap'>
        {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
      <Banner
        purpose="Arrienda una Vivienda"
        title1="Arriendos Para todos"
        title2="Los gustos"
        desc1=" Explora Apartamentos, Casas"
        desc2=" y mas!"
        buttonText=" Explora Los Arriendos disponibles"
        linkname="/search?purpose=for-renting"
        imageUrl="https://multimedia.metrocuadrado.com/2671-M4483253/2671-M4483253_45_h.jpg"
      />
      <Flex flexWrap='wrap'>{
        propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {  
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}