import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "./Public/bookMeLogo.png"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='navlinks'>
      <ProfileButton user={sessionUser} />
      <NavLink style={{ textDecoration: 'none' }} className="nav" to="/properties">Our Properties</NavLink>
      <NavLink style={{ textDecoration: 'none' }} className="nav" to="/properties/new">Add Your Property</NavLink>
      <NavLink style={{ textDecoration: 'none' }} className="nav" to={`/users/${sessionUser.id}/reservations`}>See Your Reservations</NavLink>

    </div>
    );
  } else {
    sessionLinks = (
      <div className='navlinks-wrapper'>
        <img src={logo} alt="book me logo" />
        <NavLink style={{ textDecoration: 'none' }} className="nav" to="/login">Log In</NavLink>
        <NavLink style={{ textDecoration: 'none' }} className="nav" to="/signup">Sign Up</NavLink>
        {/* <NavLink style={{ textDecoration: 'none' }} className="nav" to="/properties">Our Properties</NavLink> */}
      </div>
    );
  }

  return (
<div id='nav-wrapper'>
    <div>

        {isLoaded && sessionLinks}

   </div>
</div>
  );
}

export default Navigation;
