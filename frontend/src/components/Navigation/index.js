import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='navlinks'>
      <ProfileButton user={sessionUser} />
      <NavLink to="/properties">Our Properties</NavLink>
      <NavLink to="/properties/new">Add Your Property!</NavLink>
      <NavLink to={`/users/${sessionUser.id}/reservations`}>See Your Reservations</NavLink>

    </div>
    );
  } else {
    sessionLinks = (
      <div className='navlinks'>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/properties">Our Properties</NavLink>
      </div>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
