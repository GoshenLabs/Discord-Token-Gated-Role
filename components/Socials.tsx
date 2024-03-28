// Socials.tsx
import {
    Flex,
    Icon } from '@chakra-ui/react'
  import { FaTwitter, FaDiscord } from "react-icons/fa";


const Socials = () => {
  return (
    <Flex justifyContent="center" mt={5}>
              <Icon
                as={FaTwitter}
                boxSize={8}
                cursor="pointer"
                onClick={() =>
                  window.open("https://twitter.com/BasedHunks", "_blank")
                }
                mr={4}
              />
              <Icon
                as={FaDiscord}
                boxSize={8}
                cursor="pointer"
                onClick={() =>
                  window.open(
                    "#",
                    "_blank"
                  )
                }
                mr={4}
              />
            </Flex>
  );
};

export default Socials;


