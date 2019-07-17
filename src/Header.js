import React from 'react'
import nslogo from './img/nslogo.svg'
import './css/AllPages.css'

const Header = () => (
  <div>
    <nav className="navbar" role="navigation" aria-label="main navigation" >
      <div className="navbar-brand">
        
          <a className="navbar-item" href="/">
            <img src={nslogo} alt="NS logo" width="112" height="28" />
          </a>
      
      </div>
    </nav>
  </div>
)

export default Header
