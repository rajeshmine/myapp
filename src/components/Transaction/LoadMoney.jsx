import React, { PureComponent } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';

import AppBar from 'material-ui/AppBar';
import './transaction.css';
import TextField from 'material-ui/TextField';
import { NavLink } from 'react-router-dom';
import { transaction } from '../../service/TransactionService';
import Navigation from "../common/navbar";

export default class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    }
  }
  componentDidMount() {
    this.init();
  }

  init = async () => {

  }
  LoadMoney = () => {

  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Load Money"
            />
          </div>
          <Navigation />
          <div className="LoadmoneyDiv">
            <TextField
              hintText="Enter Amount"
              floatingLabelText="Amount"
              onChange={(event, newValue) => this.setState({ amount: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.LoadMoney(event)} />
          </div>

        </MuiThemeProvider>
      </div>
    )
  }
}

const style = {
  margin: 15,
};
