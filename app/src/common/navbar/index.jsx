import React, { useState, useEffect, useContext } from "react";
import {
  NavbarContainer,
  NavbarLogo,
  NavbarLinksContainer,
  NavbarLink,
  SignUpButton,
  NavbarToggle,
  MenuOverlay,
  ToggleButton,
} from "./styles";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { BsMoon, BsSun } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";

const routes = [
  { path: "/", name: "Home" },
  { path: "/profile", name: "Profile" },
  { path: "/goals", name: "Goals" },
];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { mode, setMode } = useContext(ThemeContext);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 900);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <NavbarContainer>
      <NavbarLogo to="/">Goal_Setter</NavbarLogo>
      <NavbarToggle onClick={() => setToggle(!toggle)}>
        {toggle ? <IoCloseOutline /> : <HiBars3BottomRight />}
      </NavbarToggle>
      <MenuOverlay
        initial={{ opacity: 1, x: 0 }}
        animate={toggle ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={() => setToggle(!toggle)}
      />
      <NavbarLinksContainer
        initial={{ opacity: 1, x: 0 }}
        animate={
          toggle
            ? { opacity: 1, x: 0 }
            : isSmallScreen
            ? { opacity: 0, x: "110%" }
            : { opacity: 1, x: 0 }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {routes.map((route) => (
          <NavbarLink
            key={route.path}
            to={route.path}
            onClick={() => setToggle(!toggle)}
          >
            {route.name}
          </NavbarLink>
        ))}

        <SignUpButton
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            dispatch(LogOut());
            dispatch(reset());
            navigate("/auth/signin");
            setToggle(!toggle);
          }}
        >
          Sign out
        </SignUpButton>
      </NavbarLinksContainer>
      <ToggleButton
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
      >
        {mode === "dark" ? <BsSun /> : <BsMoon />}
      </ToggleButton>
    </NavbarContainer>
  );
};

export default Navbar;
