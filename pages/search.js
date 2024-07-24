import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Text, Icon, Box } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";

import SearchFilters from "@/componets/SearchFilters";
import Property from "@/componets/Property";
import { baseUrl, fetchApi } from "@/utils/fetchApi";
import noresult from '@/assets/images/noresult.svg'

const Search = ({ properties }) => {
    const [searchFilters, setSearchFilters] = useState(false);
    const router = useRouter();
  
    return (
      <Box>
        <Flex
          onClick={() => setSearchFilters(!searchFilters)}
          cursor='pointer'
          bg='gray.100'
          borderBottom='1px'
          borderColor='gray.200'
          p='2'
          fontWeight='black'
          fontSize='lg'
          justifyContent='center'
          alignItems='center'
        >
          <Text>Buscar Inmueble por Filtros</Text>
          <Icon paddingLeft='2' w='7' as={BsFilter} />
        </Flex>
        {searchFilters && <SearchFilters />}
        <Text fontSize='2xl' p='4' fontWeight='bold'>
          Propiedades {router.query.purpose}
        </Text>
        <Flex flexWrap='wrap'>
          {properties.map((property) => <Property property={property} key={property.id} />)}
        </Flex>
        {properties.length === 0 && (
          <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5'>
            <Image src={noresult} />
            <Text fontSize='xl' marginTop='3'>Sin Resultados</Text>
          </Flex>
        )}
      </Box>
    );
  };

  export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '6020'; // Ajustado para 'Abu Dhabi'
    const categoryExternalID = query.categoryExternalID || '4';
  
    const apiUrl = `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`;
    console.log("API Request URL:", apiUrl);
    
    const data = await fetchApi(apiUrl);
    console.log("Fetched Data:", data);

    return {
        props: {
            properties: data?.hits || [],
        },
    };
}

  export default Search;