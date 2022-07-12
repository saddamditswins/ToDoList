import styled from "styled-components";

export const SideBarWrapper = styled.div`
  //   display: none;
  height: 100vh;
  width: 250px;
  background-color: #ffffff;
  box-shadow: 0 10px 10px 2px #00000012;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  font-size: 20px;
`;

export const Header = styled.h3`
  text-align: center;
  padding: 18px 0;
  color: #fff;
  background-image: linear-gradient(to right, #088cd1, #7dc8f1);
`;
export const ColorList = styled.ul`
  padding: 20px 0;
`;
export const Colors = styled.li`
    padding: 20px 0;
    background-color: #ff00ff;
    text-align: center;
    cursor: pointer;
    &.active{
      border: 2px solid #0568b2;
      color: #fff;
      font-weight: bolder;
    }
  `;
