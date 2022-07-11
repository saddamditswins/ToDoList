import { Icon } from "semantic-ui-react";
import { HeaderWrapper } from "./style";

function Header() {
  return (
    <HeaderWrapper>
      <Icon name="bars" onclick /> Notes
    </HeaderWrapper>
  );
}

export default Header;
