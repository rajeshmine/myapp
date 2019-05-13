
import React, { PureComponent } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { checkuser } from '../../service/LoginService';
import { NavLink } from 'react-router-dom';

import './Login.css'
export default class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: ''
        }
    }

    handleClick = async () => {
        const { mobile, password } = this.state;
        if ((mobile !== '') && (password !== '')) {
            try {
                let r = await checkuser(this.state);
                if (r.data.data) {
                    localStorage.setItem("token", r.data.token);
                    await this.props.history.push('/dashboard')
                }
            } catch (err) {
                alert("Check Credentials")
            }
        } else {
            alert("Fill all the Fields")
        }

    }



    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div className="center">
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            hintText="Enter your Mobile Number"
                            floatingLabelText="Mobile"
                            onChange={(event, newValue) => this.setState({ mobile: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                        <br />

                        <NavLink to='/signup'>Signup</NavLink>

                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};