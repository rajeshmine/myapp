import React, { PureComponent } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import './transaction.css';
import { NavLink } from 'react-router-dom';
import { sendmoney, getAllUser, getAmountDetails, loadmoney } from '../../service/TransactionService';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Navigation from "../common/navbar";

import { getuser } from '../../service/jwtdecode';
import RaisedButton from 'material-ui/RaisedButton';
export default class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      users: [],
      amount: 0,
    }
  }
  componentDidMount() {
    this.init();

  }

  init = async () => {
    let getuserData = await getuser();
    let getAllusers = await getAllUser();

    console.log(getAllusers)
    await this.setState({ user: getuserData.data, users: getAllusers.data.response })
  }

  amountDetails = async () => {
    const { selected } = this.state;
    try {
      let amountDetails = await getAmountDetails({ mobileNo: selected })
      if (amountDetails.data.response) {
        let _d = amountDetails.data.response;
        await this.setState({ _ramount: _d.amount })
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  _onSelect = async (i) => {
    const { users } = this.state;
    await this.setState({
      selected: users[i].mobile
    })
    await this.amountDetails()
  }

  LoadMoney = async () => {
    const { _ramount, amount, selected, user: { mobile } } = this.state;
    if (amount !== '' && mobile !== '') {
      let r = await loadmoney({
        mobileNo: selected,
        amount: (+amount) + (+_ramount),
      });
      alert(r.data.message)
    } else {
      alert("Fill all Fields")
    }
  }



  SendMoney = async () => {
    const { amount, selected, user: { mobile } } = this.state;
    if (amount !== '' && selected !== '' && mobile !== '') {

      let r = await sendmoney({
        sender: mobile,
        recipient: selected,
        amount: amount,
      });
      if (r.data) {
        await this.LoadMoney()
      }
      console.log(r)
    } else {
      alert("Fill all Fields")
    }
    //await sendmoney(data)
  }


  render() {
    const { users, selected } = this.state;
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Send Money"
            />
          </div>
          <Navigation />
          <div className="SendmoneyDiv center">
            <SelectField
              value={this.state.selected}
              onChange={(event, newValue) => this._onSelect(newValue)}
              floatingLabelText="User">

              {users.map(x => <MenuItem key={x.mobile} value={x.mobile} primaryText={x.mobile} />)}
            </SelectField><br />
            <TextField
              hintText="Enter Amount"
              floatingLabelText="Amount"
              onChange={(event, newValue) => this.setState({ amount: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.SendMoney(event)} />
          </div>

        </MuiThemeProvider>
      </div>
    )
  }
}


const style = {
  margin: 15,
};
