import { Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Loading from "./components/Loading";
import { routes } from "./config/Routes";
import { DashBoardLayout } from "./layout";
import { IRoute } from "./models/Interfaces/INavBar";

// toast.configure({ autoClose: 5000, draggable: false });

function App() {


  const [isloading, setLoading] = useState(true);
  return (
    <>
      <ToastContainer />
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
