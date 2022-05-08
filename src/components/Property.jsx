import { Box, Flex, Text } from '@chakra-ui/layout';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { Avatar } from '@chakra-ui/avatar';
import DefaultImage from '../assets/house.jpg';
import Image from 'next/image';
import millify from 'millify';
import Link from 'next/link';


// this component call from 🟨../pages/index.js🟨
// this component call from 🟨../pages/search.js🟨
// this is a clickable Link (Child) <Component /> 
// for opening a full details for that specific property...
const Property = ({ property }) => {

    const { coverPhoto, price, rentFrequency, rooms, title,
        baths, area, agency, isVerified, externalID } = property;

    return (

        // for details viewing about this property | when user click on it...
        // then go to at 🟨../pages/property/[id].js🟨 <Component/>
        <Link href={`/property/${externalID}`} passHref>

            <Flex
                p='5'
                w='420px'
                paddingTop='0px'
                cursor='pointer'
                flexWrap='wrap'
                justifyContent='flex-start' >

                <Box>
                    <Image
                        alt={title}
                        width={400}
                        height={260}
                        src={
                            coverPhoto
                                ? coverPhoto.url
                                : DefaultImage
                        }
                    />
                </Box>

                <Box w='full'>

                    <Flex
                        paddingTop='2'
                        alignItems='center'
                        justifyContent='space-between'>
                        <Flex alignItems='center'>
                            <Box paddingRight='3' color='green.400'>
                                {isVerified && <GoVerified />}
                            </Box>
                            <Text fontWeight='bold' fontSize='lg'>
                                AED &nbsp;
                                {/* price ==> convert into human readable  */}
                                {millify(price)}
                                {rentFrequency && `/${rentFrequency}`}
                            </Text>
                        </Flex>
                        <Box>
                            <Avatar size='sm' src={agency?.logo?.url}></Avatar>
                        </Box>
                    </Flex>

                    <Flex
                        p='1'
                        w='250px'
                        color='blue.400'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        {rooms} <FaBed /> | &nbsp;
                        {baths} <FaBath /> | &nbsp;
                        {millify(area)} sqft <BsGridFill />
                        {/* area ==> convert into human readable  */}
                    </Flex>

                    <Text fontSize='lg'>
                        {
                            title.length > 30
                                ? title.substring(0, 30) + '...'
                                : title
                        }
                    </Text>

                </Box>

            </Flex>
        </Link>
    );
}

export default Property;