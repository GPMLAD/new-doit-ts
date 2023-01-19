import { ChakraProvider, Heading } from '@chakra-ui/react'
import { theme } from './styles/theme'

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Heading as='h1'>App</Heading>
    </ChakraProvider>
  )
}