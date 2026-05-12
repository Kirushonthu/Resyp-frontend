import { Outlet, Navigate } from "react-router-dom";

function Protectedroute({ isLoggedIn }) {
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default Protectedroute;
