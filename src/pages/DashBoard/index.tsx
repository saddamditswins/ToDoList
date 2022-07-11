import { DashBoardWrapper, MainContainer, ColorBox } from "./style";

const DashBoard = () => {
  return (
    <DashBoardWrapper>
      <MainContainer>
        {" "}
        Enter your Todo Task
        <ColorBox style={{ backgroundColor: "#b0d8f5" }} />
        <ColorBox style={{ backgroundColor: "#cc5af2" }} />
      </MainContainer>
    </DashBoardWrapper>
  );
};

export default DashBoard;
