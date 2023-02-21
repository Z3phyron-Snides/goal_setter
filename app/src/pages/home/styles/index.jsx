import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const Header = styled.div`
  font-size: 20px;
  font-weight: 900;
  text-align: center;

  .greeting {
    margin-bottom: 20px;
    color: ${({ theme }) => theme.text};
  }

  .title {
    color: ${({ theme }) => theme.content};
  }
`;


export const Count = styled.div`
  color: ${({ theme }) => theme.content};
`;