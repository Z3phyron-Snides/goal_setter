import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import GoalCard from "../../components/goal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GetGoals, reset } from "../../features/goals/goalSlice";
import UpdateGoal from "../../components/updateGoal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};

`;

const GoalsContainer = styled(motion.div)`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
  z-index: 0;
  /* position: relative; */

  .goal {
    z-index: -1;
    @media screen and (max-width: 768px) {
          width: 100%;
    }

  }
`;

const goalVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const GoalsPage = () => {
  const { goals } = useSelector((state) => state.goal);
  const { isOpen, data } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetGoals());
    dispatch(reset());
  }, [dispatch]);

  return (
    <Container>
      <Title>My Goals</Title>
      <GoalsContainer
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {goals &&
          goals?.map((goal, i) => (
            <motion.div
              className="goal"
              key={goal?._id}
              initial={goalVariants.hidden}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: i * 0.5 },
              }}
            >
              <GoalCard goal={goal} />
            </motion.div>
          ))}
      </GoalsContainer>

      {/* Render the updateGoal component if showUpdateModal is true */}
      {isOpen && <UpdateGoal goal={data} />}
    </Container>
  );
};

export default GoalsPage;
