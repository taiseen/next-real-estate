import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import { filterData, getFilterValues } from '../utils/filterData';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { useRouter } from 'next/router';
import noResult from '../assets/noresult.svg';
import Image from 'next/image';


// this component call from 🟨../pages/search.js🟨 <Component />
export default function SearchFilters() {

    const router = useRouter();
    const [filters] = useState(filterData);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationData, setLocationData] = useState();
    const [showLocations, setShowLocations] = useState(false);


    // only received "queryName" as a parameter value...
    const searchProperties = (filterValues) => {

        const { query } = router;
        const path = router.pathname;

        // this function() come from 🟨filterData.js🟨 file...
        const values = getFilterValues(filterValues)

        values.forEach(item => {
            if (item.value && filterValues?.[item.name]) {
                // if there is specific item, that add into our query... 
                // not adding all of them...
                // only that have value exist...
                // just update the query parameter by that value for URL 
                query[item.name] = item.value
            }
        })

        router.push({ pathname: path, query: query });
    };

    
    useEffect(() => {

        if (searchTerm !== '') {

            const fetchData = async () => {
                setLoading(true);
                const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
                setLoading(false);
                setLocationData(data?.hits);
            };

            fetchData();
        }
    }, [searchTerm]);


    return (
        <Flex p='4' bg='gray.100' flexWrap='wrap' justifyContent='center' >
            {
                // RAW Data come from (filterData.js) file...
                filters?.map(filter => (
                    <Box key={filter.queryName}>
                        <Select
                            p='2'
                            w='fit-content'
                            // display users ==> filter option's / Query names...
                            placeholder={filter.placeholder}
                            onChange={e => searchProperties(
                                { [filter.queryName]: e.target.value }
                            )}
                        >
                            {
                                // displaying / render all of the values...
                                filter?.items?.map(item => (
                                    <option value={item.value} key={item.value}>
                                        {
                                            // display user ==> filter's name/value...
                                            item.name
                                        }
                                    </option>
                                ))
                            }
                        </Select>
                    </Box>
                ))
            }

            <Flex flexDir='column'>
                <Button
                    border='1px'
                    marginTop='2'
                    borderColor='gray.200'
                    onClick={() => setShowLocations(!showLocations)}
                >
                    Search Location
                </Button>

                {
                    showLocations && (
                        <Flex flexDir='column' pos='relative' paddingTop='2'>
                            <Input
                                w='300px'
                                value={searchTerm}
                                placeholder='Type Here'
                                focusBorderColor='gray.300'
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            {
                                searchTerm !== '' && (
                                    <Icon
                                        top='5'
                                        right='5'
                                        zIndex='100'
                                        as={MdCancel}
                                        pos='absolute'
                                        cursor='pointer'
                                        onClick={() => setSearchTerm('')}
                                    />
                                )
                            }

                            {
                                loading && <Spinner margin='auto' marginTop='3' />
                            }

                            {
                                showLocations && (
                                    <Box height='300px' overflow='auto'>
                                        {
                                            locationData?.map(location => (
                                                <Box
                                                    key={location.id}
                                                    onClick={() => {
                                                        searchProperties({ locationExternalIDs: location.externalID });
                                                        setShowLocations(false);
                                                        setSearchTerm(location.name);
                                                    }}
                                                >
                                                    <Text
                                                        p='2'
                                                        bg='gray.200'
                                                        cursor='pointer'
                                                        borderBottom='1px'
                                                        borderColor='gray.100' >
                                                        {location.name}
                                                    </Text>
                                                </Box>
                                            ))
                                        }

                                        {
                                            !loading && !locationData?.length && (
                                                <Flex
                                                    marginTop='5'
                                                    marginBottom='5'
                                                    flexDir='column'
                                                    alignItems='center'
                                                    justifyContent='center'
                                                >
                                                    <Image src={noResult} alt="no result" />
                                                    <Text fontSize='xl' marginTop='3'>
                                                        Waiting to search!
                                                    </Text>
                                                </Flex>
                                            )
                                        }
                                    </Box>
                                )}
                        </Flex>
                    )
                }
            </Flex>
        </Flex>
    );
}