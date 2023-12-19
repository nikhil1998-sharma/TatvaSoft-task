import { RouterProvider, createBrowserRouter } from "react-router-dom";
import User from "./User";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <User />,
  },
]);

function App() {
  return (
    <div className="">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
