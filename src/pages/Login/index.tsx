import { Button, Flex, Grid, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import LogoPrimary from '../../assets/logo-primary.svg'
import { Input } from "../../components/Form/input";
import * as yup from "yup"
import { yupResolver} from "@hookform/resolvers/yup"

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

  return(
    <Flex
      height="100vh" 
      color="white"
      alignItems="center"
      bgGradient="linear(to-r, purple.800 65%, white 35%)">
        <Flex
        w="100%"
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
        >
          <Grid
          w="100%"
          paddingRight="100px"
          >
            <Image src={LogoPrimary} alt="doit" boxSize="120px"/>
            <Heading as="h1">O jeito fácil, grátis</Heading>
            <Text>
              Flexível e atrativo de gerenciar <b>seus projetos em uma única plataforma</b>
            </Text>
          </Grid>

          <Grid 
            as="form"
            onSubmit={handleSubmit(submitLogin)}
            w="50%" 
            p="40px 30px"
            border="3px solid"
            borderColor="gray.100"
            bg="white"
            color="gray.900">
            <Heading>Bem-vindo de volta!</Heading>
            <VStack spacing='4'>
              <Input {...register("email")} icon={FaEnvelope} type='email' name="email" label="E-mail" placeholder="Digite seu e-mail" error={errors.email}/>

              <Input {...register("password")} icon={FaLock} name="password" type="password" label="Senha" placeholder="Digite sua senha" error={errors.password}/>
            </VStack>
            <Button type="submit">Entrar</Button>
          </Grid>
        </Flex>
    </Flex>
  )
}