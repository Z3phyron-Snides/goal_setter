import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Root = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token && !location.pathname.includes("/auth")) {
      navigate("/auth/signin");
    }
  }, [user, location, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Root;
