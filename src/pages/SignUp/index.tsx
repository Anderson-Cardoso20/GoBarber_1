import React, {useCallback, useRef} from "react";
import {FiArrowLeft, FiMail,FiUser,FiLock} from 'react-icons/fi'
import {FormHandles} from '@unform/core';
import { Form } from "@unform/web";
import * as Yup from 'yup';
import getValidationErrors from "../../utils/getValidationErrors";
import logoImg from '../../assets/logo.svg';
import Input from "../../components/input";
import Button from "../../components/button";
import { Container, Content, Background } from "./styles";

const SignUp: React.FC = () =>{
   
    const formRef = useRef<FormHandles>(null);
  

   const handleSubmit = useCallback(async (data:object)=>{
       try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória').min(6, 'Senha deve conter o mínimo 6 dígitos'),
            });


        await schema.validate(data, {
            abortEarly: false,            
        });    
        
      
       } catch (err){

       const errors = getValidationErrors(err);
       formRef.current?.setErrors(errors)        
       }
    },[]);

    return (
        <Container>
        <Background />
        <Content>
            <img src={logoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu cadastro</h1>

                <Input name="nome" icon={FiUser} placeholder="Nome" />

                <Input name="email" icon={FiMail} placeholder="Nome" />

                <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

                <Button type="submit">Cadastrar</Button>
                
            </Form>

            <a>
                <FiArrowLeft/>
                Voltar para logon.
            </a>
        </ Content>
       
    </Container>
    )
}
;

export default SignUp