import { createBrowserRouter } from "react-router-dom";
import Manager from "./components/Manager";
import SearchByPmid from "./components/SearchByPmid";
const router = createBrowserRouter([
  {
    path: "/idivine",
    element: <SearchByPmid />,
  },
  { path: "/idivine/manager", element: <Manager /> },
]);

export default router;
