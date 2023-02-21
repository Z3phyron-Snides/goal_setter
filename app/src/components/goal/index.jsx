import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import moment from "moment";
import { useDispatch } from "react-redux";
import { openModal } from "../../features/tools/modal";
import { DeleteGoal } from "../../features/goals/goalSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.cards};
  border-radius: 10px;
  box-shadow: 0px 3px 6px ${({ theme }) => theme.shadow};
  position: relative;
  z-index: 7;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const Text = styled.p`
  font-size: 24px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Timestamp = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.content};
  margin-bottom: 20px;
`;

const OptionButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.content};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

const OptionsContainer = styled(motion.div)`
  position: absolute;
  top: 30px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  border-radius: 10px;
  box-shadow: 0px 3px 6px ${({ theme }) => theme.shadow};
  overflow: hidden;
  z-index: 1;
`;

const Option = styled.button`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.content};
  font-size: 13px;
  cursor: pointer;
  padding: 10px;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.text};
  }
`;

const GoalCard = ({ goal }) => {
  const [showOptions, setShowOptions] = useState(false);

  const dispatch = useDispatch();

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleDelete = () => {
    dispatch(DeleteGoal(goal?._id));
    toggleOptions();
  };

  return (
    <Container>
      <Text>{goal?.goal}</Text>
      <Timestamp>{moment(goal?.created_at).format("MMMM Do, YYYY")}</Timestamp>
      <OptionButton onClick={toggleOptions}>...</OptionButton>
      {showOptions && (
        <OptionsContainer
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          <Option
            onClick={() => {
              toggleOptions();
              dispatch(openModal(goal));
            }}
          >
            Update
          </Option>
          <Option onClick={handleDelete}>Delete</Option>
        </OptionsContainer>
      )}
    </Container>
  );
};

export default GoalCard;
