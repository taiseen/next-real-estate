import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import { BsFilter } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SearchFilters from '../components/SearchFilters';
import noResult from '../assets/noresult.svg'
import Property from '../components/Property';
import Image from 'next/image'


// this component call from 🟨Navbar🟨 <Component /> by user clicking...
// & this 🟨properties🟨 [array] props come from ==> getServerSideProps() || SSR
const Search = ({ properties }) => {

    const router = useRouter();
    const [searchFilters, setSearchFilters] = useState(false);

    return (
        <Box mt='65px'>

            <Flex
                // use for just Open/Close 🟨SearchFilter🟨 <Component />
                onClick={() => setSearchFilters(!searchFilters)}
                p='2'
                bg='gray.100'
                fontSize='lg'
                cursor='pointer'
                fontWeight='black'
                borderBottom='1px'
                alignItems='center'
                borderColor='gray.300'
                justifyContent='center'
            >
                <Text>Search Property By Filters</Text>
                <Icon paddingLeft='2' w='7' as={BsFilter} />
            </Flex>

            {
                // 🟨SearchFilters🟨 <Component /> Open/Close 
                // by toggling value of this "searchFilters" local variable
                searchFilters && <SearchFilters />
            }

            <Text fontSize='2xl' p='4' fontWeight='bold'>
                Properties
                {
                    // this value come from 🟨Navbar🟨 <Component /> as query parameter
                    // when user click on Menu Link href="....."
                    // ?purpose is ==> query + variable
                    router.query.purpose
                }
            </Text>


            {/* for mobile responsive view */}
            <Flex flexWrap='wrap' justifyContent='center'>
                {
                    // properties[array] have ✅ value... loop 🔄 over it...
                    properties.map(property =>
                        // Child <Component /> call by looping... 🔄
                        // For Displaying Only Searching Results...
                        <Property property={property} key={property.id} />
                    )
                }
            </Flex>

            {
                // if properties[array] have ❗❗NO❗❗ value... 
                // display No Result Found...
                !properties.length && (
                    <Flex
                        marginTop='5'
                        marginBottom='5'
                        flexDir='column'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Image src={noResult} alt="no result" />
                        <Text fontSize='xl' marginTop='3'>No Result Found...</Text>
                    </Flex>
                )
            }
        </Box>
    );
};


// SSR ==> Fetch data base on each request... 
// when user click at SearchFilter Options...
export async function getServerSideProps({ query }) {

    // needful values come from "query" parameter || set default values... in these variables...
    const sort = query.sort || 'price-desc';
    const purpose = query.purpose || 'for-rent';
    const areaMax = query.areaMax || '35000';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const rentFrequency = query.rentFrequency || 'yearly';
    const categoryExternalID = query.categoryExternalID || '4';
    const locationExternalIDs = query.locationExternalIDs || '5002';

    // by this property variables, make a query api request for data...
    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

    return {
        props: {
            properties: data?.hits,
        },
    };
}

export default Search;