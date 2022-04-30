import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { baseUrl, fetchApi } from '../../utils/fetchApi';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { Avatar } from '@chakra-ui/avatar';
import ImageScrollbar from '../../components/ImageScrollbar';
import millify from 'millify';


// this component call from 🟨Property🟨 <Component />
// for details viewing of all about specific property...
// & this 🟨propertyDetails🟨 {object} props come from ==> getServerSideProps() || SSR
const PropertyDetails = ({ propertyDetails }) => {

  const { price, rentFrequency, rooms, title, baths, area, agency, isVerified,
    description, type, purpose, furnishingStatus, amenities, photos } = propertyDetails;

  return (
    <Box maxWidth='1000px' margin='auto' p='4' mt='72px'>

      {
        // call this 🟨ImageScrollbar🟨 <Component /> for displaying Images[array]... 
        photos && <ImageScrollbar photos={photos} />
      }

      {/* Display Short Important Info... */}
      <Box w='full' p='6'>

        <Flex paddingTop='2' alignItems='center'>
          <Box paddingRight='3' color='green.400'>
            {isVerified && <GoVerified />}
          </Box>
          <Text fontWeight='bold' fontSize='lg'>
            AED {price.toLocaleString()}{rentFrequency && `/${rentFrequency}`}
          </Text>
          <Spacer />
          <Avatar size='md' src={agency?.logo?.url}></Avatar>
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

        </Flex>

      </Box>


      {/* Display only Title & Description */}
      <Box marginTop='2'>
        <Text fontSize='lg' marginBottom='2' fontWeight='bold'>
          {
            title.split('/').join(' / ')
          }
        </Text>

        {/* 
          if inside this 🟨description🟨 property, have any kind of HTML <tag's />...
          then do not process it as a normal output text at user screen... 
          rather then process those <tag's /> according to their nature...
          that why we use 🟨dangerouslySetInnerHTML🟨 attribute here...
        */}
        <Text
          lineHeight='2'
          color='gray.600'
          textAlign='justify'
          dangerouslySetInnerHTML={{ __html: description }} />
        {/* {description}</Text> */}
      </Box>


      <Flex
        mt='6'
        mb='8'
        flexWrap='wrap'
        textTransform='uppercase'
        justifyContent='space-between'
      >

        <Flex
          p='3'
          w='400px'
          borderBottom='1px'
          borderColor='gray.400'
          justifyContent='space-between'
        >
          <Text>Type</Text>
          <Text fontWeight='bold'>{type}</Text>
        </Flex>

        <Flex
          p='3'
          w='400px'
          borderBottom='1px'
          borderColor='gray.400'
          justifyContent='space-between'
        >
          <Text>Purpose</Text>
          <Text fontWeight='bold'>{purpose}</Text>
        </Flex>

        {
          furnishingStatus && (
            <Flex
              p='3'
              w='400px'
              borderBottom='1px'
              borderColor='gray.400'
              justifyContent='space-between'
            >
              <Text>Furnishing Status</Text>
              <Text fontWeight='bold'>{furnishingStatus}</Text>
            </Flex>
          )
        }

      </Flex>


      <Box>
        {
          amenities?.length &&
          <Text fontSize='2xl' fontWeight='black' marginTop='5'>Facilities:</Text>
        }

        <Flex flexWrap='wrap'>
          {
            // amenities means ==> extra features that come with house...
            // like ==> pool, garden, cctv...
            amenities?.map(item => (
              item?.amenities?.map(amenity => (
                <Text
                  key={amenity.text}
                  m='1'
                  p='2'
                  fontSize='l'
                  bg='gray.200'
                  borderRadius='5'
                  color='blue.400'
                  fontWeight='bold'
                >
                  {amenity.text}
                </Text>
              ))
            ))
          }
        </Flex>
      </Box>
    </Box>
  );
}

export default PropertyDetails;



// SSR ==> Fetch data base on each request 
// when user click at specific property box... 
// fetching data for that specific property...
export async function getServerSideProps({ params: { id } }) {

  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}