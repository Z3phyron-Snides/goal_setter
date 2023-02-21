

import styled from "styled-components";
import { motion } from "framer-motion";
import { Form,  ErrorMessage } from "formik";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 5%;
`;
export const Wrapper = styled.div`
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 10px;
  width: 50%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const FormCtrl = styled(motion.div)`
  display: flex;
  gap: 20px;
  align-items: center;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  width: 100%;
  position: relative;
  .toggle {
    position: absolute;
    right: 10px;
    top: 60%;

    @media screen and (max-width: 900px) {
    }
    @media screen and (max-width: 500px) {
      top: 15px;
    }
  }
`;

export const InputLabel = styled.label`
  margin-bottom: 5px;
 
`;

export const Input = styled.input`
  padding: 10px;
  outline: none;
  border-radius: 8px;
  border: none;
  background-color: #fff;
  width: 100%;
`;

export const Error = styled(ErrorMessage)`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  position: absolute;
  bottom: -20px;
`;

export const Button = styled(motion.button)`
  padding: 10px 20px;
  background-color: #0077ff;
  color: #fff;
  border-radius: 8px;
  border: none;
  outline: none;
  margin-top: 20px;
  cursor: pointer;
`;

export const LinkButton = styled(motion.small)`
  text-align: left;
  margin-right: auto;
  margin-top: 10px;
  cursor: pointer;
`;
