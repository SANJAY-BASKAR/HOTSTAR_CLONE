import { useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../firebase";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
          navigate("/home"); // Navigate after login
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate("/"); // Navigate after sign out
        })
        .catch((err) => alert(err.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <Nav>
      <Logo>
        <img src="/image/logo.svg" alt="Disney+" />
      </Logo>

      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>  /*{!username ? <login/> : <></>}------> syntax to be used*/
      ) : (
        <>
          <NavMenu>
            <Link to="/home">
              <img src="/image/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </Link>
            <Link to="/search">
              <img src="/image/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </Link>
            <Link to="/watchlist">
              <img src="/image/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </Link>
            <Link to="/originals">
              <img src="/image/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </Link>
            <Link to="/movies">
              <img src="/image/movie-icon.svg" alt="MOVIES" />
              <span>MOVIES</span>
            </Link>
            <Link to="/series">
              <img src="/image/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </Link>
          </NavMenu>            
      
          <SignOut>

            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </SignOut>
          <LogoutButton onClick={handleAuth}>OUT</LogoutButton>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }

  @media (max-width: 768px) {
    margin-right: 30%;
  } 
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
  width: auto; /* Adjusted for dynamic sizing */

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 2vw; /* Use viewport width for dynamic sizing */
      min-width: 0;
      width: 2vw; /* Adjusted for dynamic sizing */
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 0.9vw; /* Use viewport width for font size */
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0;
        opacity: 0;
        position: absolute;
        right: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
    cursor: pointer;
  }
  &:active {
    background-color: green;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }



  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }  
`;

// const DropDown = styled.div`
//   position: absolute;
//   top: 48px;
//   right: 0px;
//   background: rgb(19, 19, 19);
//   border: 1px solid rgba(151, 151, 151, 0.34);
//   border-radius: 4px;
//   box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
//   padding: 10px;
//   font-size: 14px;
//   letter-spacing: 3px;
//   width: 100px;
//   opacity: 0;
//   transition: opacity 0.5s;

//   ${SignOut}:hover & {
//     opacity: 1;
//   }
// `;

const LogoutButton = styled.button`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  color: white;
  margin-left: 1%;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
    cursor: pointer;
  }

  &:active {
    background-color: red;
  }


  }`

export default Header;
