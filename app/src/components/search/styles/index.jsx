// styles.js

import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 300px;
  margin: 0 auto;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

export const Suggestions = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #fff;
  list-style: none;
  z-index: 1;

  li {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
    }
  }
`;
