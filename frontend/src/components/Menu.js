import styled from "styled-components";
import { ReactComponent as Logo } from "../idivine.svg";
import { useLocation } from "react-router-dom";

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: lightgray;
  padding-top: 40px;
  padding-left: 30px;
  height: 80px;

  #menu {
    margin-right: 100px;
    width: 300px;
    display: flex;
    justify-content: space-around;
    a {
      font-size: 2rem;
      text-decoration: none;
      color: white;
      &.active {
        color: gray;
      }
    }
  }
`;

const Menu = () => {
  const location = useLocation();
  return (
    <Nav>
      <Logo />
      <div id="menu">
        <a
          href="/idivine"
          className={location.pathname === "/idivine" ? "active" : ""}
        >
          Finder
        </a>
        <a
          href="/idivine/manager"
          className={location.pathname === "/idivine/manager" ? "active" : ""}
        >
          Manager
        </a>
      </div>
      <div></div>
    </Nav>
  );
};

export default Menu;
