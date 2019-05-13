import React, { PureComponent } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';

import AppBar from 'material-ui/AppBar';
import './transaction.css';
import TextField from 'material-ui/TextField';
import { NavLink } from 'react-router-dom';
import { loadmoney, getAmountDetails } from '../../service/TransactionService';
import Navigation from "../common/navbar";

import { getuser } from '../../service/jwtdecode';
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
    let getuserData = await getuser();
    await this.setState({ user: getuserData.data })
    await this.amountDetails()
  }

  amountDetails = async () => {
    const { user: { mobile } } = this.state;
    try {
      let amountDetails = await getAmountDetails({ mobileNo: mobile })
      if (amountDetails.data.response) {
        let _d = amountDetails.data.response;
        await this.setState({ amount: _d.amount })
      } else {
        await this.setState({ amount: 0 })
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  LoadMoney = async () => {
    const { amount, user: { mobile } } = this.state;
    if (amount !== '' && mobile !== '') {
      let r = await loadmoney({
        mobileNo: mobile,
        amount: amount,
      });
      console.log(r)
    } else {
      alert("Fill all Fields")
    }
  }

  render() {
    const { amount } = this.state
    console.log(amount)
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
              onChange={(event, newValue) => this.setState({ amount: (+newValue) + (+amount) })}
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
