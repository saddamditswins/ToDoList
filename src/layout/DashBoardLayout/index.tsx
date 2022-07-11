import Header from "../Header";
import SideBar from "../SideBar";
import { Main } from "./style";

function DashBoardLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Header />
      <SideBar />
      <Main>{children}</Main>
    </>
  );
}
export default DashBoardLayout;
