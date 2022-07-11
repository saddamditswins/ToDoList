import { SideBarWrapper, Header, ColorList, Colors } from "./style";

function SideBar() {
  return (
    <SideBarWrapper>
      <Header>Filters</Header>

      <ColorList>
        <Colors />
        <Colors />
        <Colors />
        <Colors />
        <Colors />
        <Colors />
      </ColorList>
    </SideBarWrapper>
  );
}

export default SideBar;
