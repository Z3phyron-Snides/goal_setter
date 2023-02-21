import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { reset, UpdateGoal } from "../../features/goals/goalSlice";
import { closeModal } from "../../features/tools/modal";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.overlays};
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Modal = styled(motion.div)`
  background-color: ${({ theme }) => theme.background};
  border-radius: 10px;
  color: ${({ theme }) => theme.text};
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 3;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.content};
`;

const Input = styled(Field)`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.25rem;
  background: ${({ theme }) => theme.cards};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  border: none;
  color: ${({ theme }) => theme.button.text};
  background-color: ${({ theme }) => theme.button.background};
  font-size: 16px;
  padding: 7px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;

  &.cancel {
    background: none;
    color: ${({ theme }) => theme.button.background};

    &:hover {
      background: none;
      color: ${({ theme }) => theme.content};
     
    }
  }

  &:hover {
    color: ${({ theme }) => theme.button.hover.text};
    background-color: ${({ theme }) => theme.button.hover.background};
  }
`;

const Index = ({ goal, onClose }) => {
  const { isSuccess } = useSelector((state) => state.goal);
  const dispatch = useDispatch();
  const handleSubmit = async (values, { setSubmitting }) => {
    const data = { id: goal?._id, goal: values };
    dispatch(UpdateGoal(data));
    setTimeout(() => {
      dispatch(closeModal());
    }, 500);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess, dispatch]);

  return (
    <Overlay onClick={onClose}>
      <Modal
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Update Goal</h2>
        <Formik initialValues={{ goal: goal?.goal }} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <FormField>
                <Label htmlFor="goal">Goal Text</Label>
                <Input type="text" id="goal" name="goal" />
              </FormField>
              <ButtonContainer>
                <Button
                  onClick={() => dispatch(closeModal())}
                  className="cancel"
                >
                  cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Update
                </Button>
              </ButtonContainer>
            </Form>
          )}
        </Formik>
      </Modal>
    </Overlay>
  );
};

export default Index;
