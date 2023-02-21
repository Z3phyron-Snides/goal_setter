import { Outlet } from "react-router-dom";
import styled from "styled-components";
import TopNavbar from "../navbar";
import { useState } from "react";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <TopNavbar toggleOpen={toggleOpen} />
      <Wrapper>
        <Pages>
          <Outlet />
        </Pages>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`

`;
const Wrapper = styled.div`

`;

const Pages = styled.div`
 
  padding: 5%;
`;




export default Index;
