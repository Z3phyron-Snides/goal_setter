import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;

`;

const ProfileName = styled(motion.h1)`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};

  span {
    font-weight: 100;
    color: ${({ theme }) => theme.content};
  }
`;

const ProfileEmail = styled(motion.p)`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};

  span {
    font-weight: 100;
    color: ${({ theme }) => theme.content};
  }
  /* text-align: center; */
`;

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const nameVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.3 },
    },
  };

  const emailVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.6 },
    },
  };

  return (
    <motion.div
      as={Container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={nameVariants}>
        <ProfileName>
          Name: <span>{`${user?.firstName} ${user?.lastName}`}</span>
        </ProfileName>
      </motion.div>
      <motion.div variants={emailVariants}>
        <ProfileEmail>
          Email: <span>{user?.email}</span>
        </ProfileEmail>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
