import { Navigate } from "react-router-dom";
import routePaths from "../../config/RoutePaths";

function DashBoardLayout({ children }: { children: JSX.Element }) {

  return (
    <>
      {children}
    </>
  );
}
export default DashBoardLayout;
