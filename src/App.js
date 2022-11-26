import { GlobalContext } from "./globalState/GlobalState";
import { useContext } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import MainPage from './pages/MainPage/MainPage'
import MainScreenWork from "./pages/MainScreenWorkPage/MainScreenWork.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "pages/:page",
        element: <MainPage/>,
        errorElement: <ErrorPage/>
      },
    ]
  },
  {
    path: "/work",
    element: <MainScreenWork/>,
    errorElement: <ErrorPage/>
  }
]);

function App() {

  const value = useContext(GlobalContext)

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
