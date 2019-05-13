
import React, { PureComponent } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { signup } from '../../service/LoginService';
import { NavLink } from 'react-router-dom';

import './Login.css'
export default class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: '',
            confirmpassword: '',
            name: ''
        }
    }

    handleClick = async () => {
        const { mobile, password, confirmpassword, name } = this.state;
        if ((mobile !== '') && (password !== '') && (confirmpassword !== '') && (name !== '')) {
            if (password === confirmpassword) {
                try{
                    let r = await signup(this.state)
                    if (r.data.message){
                        console.log(r.data.message)
                        await this.props.history.push('/login')
                    }
                   
                }catch(err){
                    console.log(err.message)
                }
                
            } else {
                alert("Password and Confirm Password Missmatch")
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
                            title="SignUp"
                        />
                        <TextField
                            hintText="Enter your Name"
                            floatingLabelText="Name"
                            onChange={(event, newValue) => this.setState({ name: newValue })}
                        />
                        <br />
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
                        <TextField
                            type="password"
                            hintText="Enter your Confirm Password"
                            floatingLabelText="Confirm Password"
                            onChange={(event, newValue) => this.setState({ confirmpassword: newValue })}
                        />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                        <br/>
                        
                        <NavLink to ='/login'>Login</NavLink>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};