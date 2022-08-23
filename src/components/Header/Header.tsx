import { ReactNode, FC, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import "./Header.scss"
import { useTerminalHeader } from '../../hooks/useTerminalHeader';
const Links = ['home', "tree-repository"] as const;

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

 const  Header: FC<{children: ReactNode, setPage: (newPage: "home" | "tree-repository") => void}> = ({children, setPage}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const command = useTerminalHeader();
  
  return (
    <>
      <Box bg={"#1b1c1d"} color={"#a9a9b3"} px={4} display={"flex"} justifyContent={"center"}>
        <Flex h={16} alignItems={'center'} maxWidth={1200} w={"100%"} justifyContent={'space-between'}>
        <div className='container-text-terminal-header'>
         <span className='text-terminal-header'>{`> $ gati ${command}`}</span>
         <div className='rectangle' />
          </div>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <div className='header-link' onClick={() => setPage(link)} key={link}>{link}</div>
              ))}
            </HStack>
          </HStack>
 
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {children}
    </>
  );
}

export default Header;