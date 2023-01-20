import { FormControl, 
  FormLabel, 
  FormErrorMessage, 
  Input as ChakraInput, 
  InputProps as ChakraInputProps, 
  InputLeftElement, 
  InputGroup} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons";
import { forwardRef } from "react";

interface iInputProps extends ChakraInputProps{
  name: string;
  label?: string;
  error?: FieldError | null;
  icon?: IconType;
}

type inputVariationOptions = {
  [key:string]: string
}

const inputVariation : inputVariationOptions = {
  error: "red.600",
  default: "gray.200",
  focus: "purple.800",
  filled: "green.600"
}

export const Input = forwardRef<HTMLInputElement, iInputProps>(({ name, placeholder, error, icon: Icon, label , ...rest}, ref) => {

  const [value, setValue] = useState("")
  const [variation, setVariation] = useState("default")


  const handleInputFocus = useCallback(() => {
    if(!error){
      setVariation("focus")
    }
  },[error])

  const handleInputBlur = useCallback(() => {
    if(value.length > 1 && !error){
      return setVariation("filled")
    }
  },[error,value])

  useEffect(() => {
    if(error){
      return setVariation("error")
    }
  },[error])

  return(
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel>{label}</FormLabel>}

      <InputGroup flexDirection="column">

        {Icon && (
          <InputLeftElement color={inputVariation[variation]}>
            <Icon/>
          </InputLeftElement>
          )
        }
        <ChakraInput
        onChangeCapture={(e) => setValue(e.currentTarget.value)} 
        ref={ref}
        name={name} 
        placeholder={placeholder} 
        bg="gray.50" 
        color={inputVariation[variation]}
        borderColor={inputVariation[variation]}
        variant="outline" 
        _hover={{bgColor: "gray.100"}} 
        _placeholder={{color: "gray.300"}}
        onFocus={handleInputFocus}
        onBlurCapture={handleInputBlur}
        {...rest}

        />

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </InputGroup>

    </FormControl>
  )
})