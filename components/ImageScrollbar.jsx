import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { Box, Icon, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import Image from 'next/image';


// this function pass at attribute={...} for navigation
const LeftArrow = () => {

    // <== <== <== <== <== <== <== <== <== for going to
    const { scrollPrev } = useContext(VisibilityContext);
    // <== <== <== <== <== <== <== <== <== for going to

    return (
        <Flex justifyContent='center' alignItems='center' marginRight='1'>
            <Icon
                fontSize='2xl'
                cursor='pointer'
                as={FaArrowAltCircleLeft}
                onClick={() => scrollPrev()}
                d={['none', 'block', 'block', 'block']}
            />
        </Flex>
    );
}


// this function pass at attribute={...} for navigation
const RightArrow = () => {

    // for going to ==> ==> ==> ==> ==> ==> ==> ==> ==>
    const { scrollNext } = useContext(VisibilityContext);
    // for going to ==> ==> ==> ==> ==> ==> ==> ==> ==>

    return (
        <Flex justifyContent='center' alignItems='center' marginLeft='1'>
            <Icon
                fontSize='2xl'
                cursor='pointer'
                as={FaArrowAltCircleRight}
                onClick={() => scrollNext()}
                d={['none', 'none', 'block', 'block']}
            />
        </Flex>
    );
}


// this component only call from 🟨../pages/property/[id].js🟨 <Component />
// for displaying images at scrollable way...
export default function ImageScrollbar({ photos }) {

    return (
        <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            style={{ overflow: 'hidden' }}
        >
            {
                // these photo[array] come from 🟨parent🟨 <Component />
                photos.map(item => (
                    <Box
                        p='1'
                        width='910px'
                        key={item.id}
                        itemId={item.id}
                        overflow='hidden'
                    >
                        <Image
                            width={1000}
                            height={500}
                            src={item.url}
                            blurDataURL={item.url}
                            alt='photos of property'
                            placeholder="Blur image is loading..."
                            sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px" />
                    </Box>
                ))
            }
        </ScrollMenu>
    );
}
