import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/index";
import Tag from "./pages/tag";
import Address from "./pages/address";
import Relay from "./pages/relay";
import Search from "./pages/search";
import Profile from "./pages/profile";
import NProfile from "./pages/nprofile";
import NPub from "./pages/npub";
import Write from "./pages/write";
import Qa from "./pages/qa"
import IdentityTree from "./pages/identity"
import Test from "./pages/test"

export default createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/qa",
    element: <Qa />,
  },
  {
    path: "/identityTree",
    element: <IdentityTree />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "search",
    element: <Search />,
  },
  {
    path: "/r/:nrelay",
    element: <Relay />,
  },
  {
    path: "/a/:naddr",
    element: <Address />,
  },
  {
    path: "/u/:nprofile",
    element: <NProfile />,
  },
  {
    path: "/p/:npub",
    element: <NPub />,
  },
  {
    path: "/t/:t",
    element: <Tag />,
  },
  {
    path: "write",
    element: <Write />,
  },
  {
    path: ":p",
    element: <Profile />,
  },
]);
