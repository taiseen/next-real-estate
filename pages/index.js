import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from '../components/Property';
import Image from 'next/image';
import Link from 'next/link';


// Simple Place Holder | Child <Component /> 
// this component call (2 times) from 🟨index.js🟨 <Component />
export const Banner = (props) => {

  const { purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl } = props;

  return (
    <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>

      <Image src={imageUrl} width={500} height={300} alt={title1} />

      <Box p='5' ml='5'>

        <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>

        <Text fontSize='3xl' fontWeight='bold'>
          {title1}<br />{title2}
        </Text>

        <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>
          {desc1}<br />{desc2}
        </Text>

        <Button fontSize='xl' bg="blue.300" color="gray.700">
          <Link href={linkName}>
            <a>{buttonText}</a>
          </Link>
        </Button>

      </Box>

    </Flex>
  );
}

// fileName ==> index.js | Parent <Component />
// functionName ==> Home | Parent <Component />
// & this 🟨properties🟨 [array] props come from ==> getStaticProps() || SSG
const Home = ({ propertiesForRent, propertiesForSale }) => (

  <Box mt='100'>

    {/* Child <Component /> Calling... */}
    <Banner
      purpose='RENT A HOME'
      title1='Rental Homes for'
      title2='Everyone'
      desc1=' Explore from Apartments, builder floors, villas'
      desc2='and more'
      buttonText='Explore Renting'
      linkName='/search?purpose=for-rent'
      // this 🟡linkName🟡 use by 🟨Navbar🟨 <Component /> when user click at Link...
      imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
    />

    {/* for mobile responsive view */}
    <Flex flexWrap='wrap' justifyContent='center'>
      {
        propertiesForRent.map(property =>
          // Child <Component /> call by looping... 🔄
          <Property property={property} key={property.id} />
        )
      }
    </Flex>

    <Box mt='30' borderTop='1px' borderColor='gray.500'> </Box>

    {/* Child <Component /> Calling... */}
    <Banner
      purpose='BUY A HOME'
      title1=' Find, Buy & Own Your'
      title2='Dream Home'
      desc1=' Explore from Apartments, land, builder floors,'
      desc2=' villas and more'
      buttonText='Explore Buying'
      linkName='/search?purpose=for-sale'
      // this 🟡linkName🟡 use by 🟨Navbar🟨 <Component /> when user click at Link...
      imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
    />

    {/* for mobile responsive view */}
    <Flex flexWrap='wrap' justifyContent='center'>
      {
        propertiesForSale.map(property =>
          // Child <Component /> call by looping... 🔄
          <Property property={property} key={property.id} />
        )
      }
    </Flex>

  </Box>
);


// fetch data from api || server...
// & pass into 🟨Home🟨 <Component /> for UI Rendering...
// SSG (Server Site Generation) ==> Fetch data at build time
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

export default Home;