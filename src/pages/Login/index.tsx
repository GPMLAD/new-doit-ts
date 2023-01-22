import { Box, Button, Flex, Grid, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import LogoPrimary from '../../assets/logo-primary.svg'
import { Input } from "../../components/Form/input";
import * as yup from "yup"
import { yupResolver} from "@hookform/resolvers/yup"
import { useState } from "react";

const loginSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória")
})

interface iLoginData{
  email: string;
  password: string
}
  

export function Login(){
  
  const { register, handleSubmit ,formState: {errors}} = useForm<iLoginData>({
    resolver: yupResolver(loginSchema),
    mode: "onTouched"
  })

  const submitLogin:SubmitHandler<iLoginData> = (data) => {
    console.log(data)
  }

  const [loading, setLoading] = useState(false)

  return(
    <Flex
      height={["auto" , "auto", "100vh", "100vh"]} 
      color="white"
      padding={['10px 15px','10px 15px','0px','0px']}
      alignItems="center"
      justifyContent="center"
      bgGradient={["linear(to-b, purple.800 65%, white 35%)",
      "linear(to-b, purple.800 65%, white 35%)",
      "linear(to-r, purple.800 65%, white 35%)",
      "linear(to-r, purple.800 65%, white 35%)"]}>
        <Flex
        w={["100%","100%","90%","90%"]}
        justifyContent="center"
        flexDirection={["column","column","row","row"]}
        alignItems="center"
        >
          <Grid
          w={["100%","100%","50%","50%"]}
          paddingRight="100px"
          >
            <Image src={LogoPrimary} alt="doit" boxSize={["120px","120px","150px","150px"]}/>
            <Heading mt="4" as="h1">O jeito fácil, grátis</Heading>
            <Text maxW="350px" mt="4" mb={["4","4","0","0"]}>
              Flexível e atrativo de gerenciar <b>seus projetos em uma única plataforma</b>
            </Text>
          </Grid>

          <Grid 
            mt={["4","4","0","0"]}
            mb={["4","4","0","0"]}
            as="form"
            onSubmit={handleSubmit(submitLogin)}
            w={["100%","100%","40%","40%"]} 
            p="40px 30px"
            border="3px solid"
            borderColor="gray.100"
            bg="white"
            color="gray.900">
            <Heading mb="4">Bem-vindo de volta!</Heading>
            <VStack spacing='4'>

              <Box w="100%">
                <Input 
                {...register("email")} 
                icon={FaEnvelope} 
                type='email' 
                name="email" 
                label="E-mail" 
                placeholder="Digite seu e-mail" 
                error={errors.email}/>
                {!errors.email && <Text color="gray.300" ml="1" mt="1">Exemplo: nome@email.com</Text>}
              </Box>

              <Input 
              {...register("password")} 
              icon={FaLock} 
              name="password" 
              type="password" 
              label="Senha" 
              placeholder="Digite sua senha" 
              error={errors.password}/>

            </VStack>

            <VStack mt="4" spacing='4'>
              <Button 
              isLoading={loading} 
              type="submit" 
              bg="purple.800" 
              w="100%" 
              h="60px" 
              borderRadius="8px" 
              _hover={{background: "purple.900"}} 
              color="white">Entrar</Button>

              <Text color="gray.400">Ainda não possui uma conta?</Text>

              <Button 
              w="100%" 
              h="60px"
              bg="gray.100" 
              color="gray.300"
              borderRadius="8px"
              _hover={{background: "gray.200"}}
              >Cadastrar</Button>
            </VStack>
          </Grid>
        </Flex>
    </Flex>
  )
}