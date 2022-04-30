import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import Link from 'next/link';


// this component call from 🟨Layout🟨 <Component />
const Navbar = () => (

    <Flex
        p='2'
        top='0'
        left='0'
        right='0'
        zIndex='1'
        boxShadow='md'
        position="fixed"
        background='white'
        borderBottom='1px'
        borderColor='gray.300'
    >

        <Box fontSize='3xl' color='blue.400' fontWeight='bold' pl='2'>
            <Link href='/'>Real Estate</Link>
        </Box>

        <Spacer />

        <Box pr='2' mt='2px'>
            <Menu >
                <MenuButton as={IconButton} icon={<FcMenu />} variant='outline' color='red.400' />

                <MenuList>
                    <Link href='/' passHref>
                        <MenuItem icon={<FcHome />}>Home</MenuItem>
                    </Link>
                    <Link href='/search' passHref>
                        <MenuItem icon={<BsSearch />}>Search</MenuItem>
                    </Link>
                    <Link href='/search?purpose=for-sale' passHref>
                        <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
                    </Link>
                    <Link href='/search?purpose=for-rent' passHref>
                        <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
                    </Link>
                </MenuList>

            </Menu>
        </Box>
    </Flex>
);

export default Navbar;
