import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='header'>
        <div className='Logobox'>
          <img className='logo' src='https://static.vecteezy.com/system/resources/previews/022/091/985/original/martial-arts-logo-design-icon-illustration-free-vector.jpg'></img>
          <h2 className='logotext'>Fightbnb</h2>
        </div>
        <div className='newspot'>
          {sessionUser ? (
            <Link
              className="Create Spot"
              to="/spots/new"
            >
              Create a New Spot
            </Link>
          ) : ""}
        </div>
    <div>
      <div>
        <NavLink exact to="/">Home</NavLink>
      </div>
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
      
    </div>
    </div>
  );
}

export default Navigation;