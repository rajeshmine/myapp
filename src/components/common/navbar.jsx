import React from 'react';
import { NavLink } from 'react-router-dom';
class Navigation extends React.Component {
    render() {
        return (
            <div className="navbarDiv">
                <NavLink to='/dashboard'>Dashboard</NavLink>
                <NavLink to='/transaction'>Transaction</NavLink>
                <NavLink to='/loadmoney'>Load Money</NavLink>
                <NavLink to='/sendmoney'>Send Money</NavLink>
                <NavLink to='/'>Logout</NavLink>
            </div>
        )
    }
}
export default Navigation;