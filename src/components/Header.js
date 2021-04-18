import React, { useEffect } from 'react'
import LocalMallIcon from '@material-ui/icons/LocalMall'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import '../style/App.css'
import { Link } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import { auth } from '../firebase'

function Header() {

  const [{basket, loggedinuser}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((userauth) => {
      if (userauth){
        dispatch ({
          type: 'SET_LOGIN',
          user: userauth
        })
      }
      else {
        dispatch ({
          type: 'SET_LOGIN',
          user: null
        })
      }
    })

  },[]);

  return (
    <nav className="header">
      <Link to="/" className="header__link">
        <div className="header__logoBox" >
          <img className="header__logo" src="https://firebasestorage.googleapis.com/v0/b/bodorakku-575ca.appspot.com/o/shopping-bag.png?alt=media&token=149b2896-aff8-4a2c-a0c5-212a51bce0f4" alt="logo" />
        </div>
      </Link>
      
      {/*
      <div className="header__search">
        <SearchIcon className="header__searchIcon" />
        <input type="text" className="header__searchInput" />
      </div>
      */}

      <div className="header__nav">
        <Link to="/shop" className="header__link">
          <div className="header__option">
            <span className="header__optionLine">SHOP</span>
          </div>
        </Link>

        <Link to="/home" className="header__link">
            <div className="header__option">
              <span className="header__optionLine">HOME</span>
            </div>
        </Link>
      </div>

        <div className="header__toolbar">
          
            <div className="header__optionUser">
                {
                  loggedinuser 
                  ?
                  <div>
                    <Link to={loggedinuser ? "/profile" : "/login"} className="header__link">
                      <PersonIcon/>
                    </Link>
                    <ExitToAppIcon className="header__link" onClick={() => auth.signOut()}/>
                  </div>
                  :
                  <Link to={loggedinuser ? "/profile" : "/login"} className="header__link">
                    <div>
                      <PersonAddIcon/>
                    </div>
                  </Link>
                }
            </div>


          <Link to="/checkout" className="header__link">
            <div className="header__optionCart">
              <LocalMallIcon/>
              <div className="header__productCount">{basket?.length}</div>
            </div>
          </Link>
        </div>
    </nav>
  );
}

export default Header;
