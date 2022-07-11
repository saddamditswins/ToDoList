import styled from "styled-components";

export const DashBoardWrapper = styled.div`
  // Width: calc(100% - 250px);
  // margin-left: auto;
`;

export const MainContainer = styled.div`
  width: 800px;
  margin: 25px auto;
  box-shadow: 0px 2px 2px 3px #00000012;
  height: auto;
  padding: 25px 0 40px;
  background: #fff;
  border-radius: 5px;
`;

export const ColorBox = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 5px;
`;

export const FormElement = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 25px auto;
  label {
    margin-bottom: 10px;
  }
`;

export const ColorBoxContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  gap: 10px;
`;
export const ColorContentBox = styled.div`
  padding: 25px 15px;
  height: 100%;
  width: max-content;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
`;

export const TodoNotes = styled.div`
  box-shadow: 0px 2px 2px 3px #00000012;
  background: #fff;
  width: 800px;
  margin: 10px auto;
  padding: 20px 20px;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
export const Heading = styled.h3`
  text-align: center;
  width: 100%;
`;
