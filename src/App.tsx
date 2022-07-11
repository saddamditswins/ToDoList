import { Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Loading from "./components/Loading";
import { routes } from "./config/Routes";
import {  DashBoardLayout } from "./layout";
import { IRoute } from "./models/Interfaces/INavBar";

function App() {
  const [isloading, setLoading] = useState(true);
  return (
    <>
      <Loading isLoading={isloading} />
      <Router>
        <Routes>
          {routes.map((route: IRoute) => {
            return (
              <Route
                path={route.path}
                element={
                    <DashBoardLayout>
                      <Suspense fallback="...Loading">
                        <route.element setLoading={setLoading} />
                      </Suspense>
                    </DashBoardLayout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;
