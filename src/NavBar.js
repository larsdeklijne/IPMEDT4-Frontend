import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './css/NavBar.css'

class NavBar extends Component {
    logOut(e){
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/EmployeeHomePage')
    }

    render(){
    
        const loginRegLink = (
            <ul id="navBarList">
                <li id="navBarListItem">
                    <Link to="\login" >
                        Login
                    </Link>
                </li>
                <li id="navBarListItem">
                    <Link to="\register" >
                        Registreer
                    </Link>
                </li>
            </ul>
        )

        const userLink = (
            <ul id="navBarList">
                <li id="navBarListItem">
                    <Link to="\login" >
                        Login
                    </Link>
                </li>
                <li id="navBarListItem">
                    <Link to="\register" >
                        Registreer
                    </Link>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <button className="navbar-toggle"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar1"
                    aria-controls="navbar1"
                    aria-expended="false"
                    aria-label="Toggle navigation"
                    >
                    <span className="navbar-toggler-icon">

                    </span>
                </button>

                <div className="collapse navbar-collapse justify-content-md-center">
                    id="navbar1"
                </div>

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link">
                            Home
                        </Link>
                    </li>
                </ul>
                {localStorage.usertoken ? userLink : loginRegLink}
            </nav>
        )

        
    }
}

export default withRouter(NavBar)