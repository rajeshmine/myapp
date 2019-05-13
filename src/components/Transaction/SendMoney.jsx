import React, { PureComponent } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import './transaction.css';
import { NavLink } from 'react-router-dom';
import { transaction } from '../../service/TransactionService';
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
      users: [{ mobile: "9791329930" }],
      amount: '',
    }
  }
  componentDidMount() {
    this.init();

  }

  init = async () => {
    let getuserData = await getuser();
    await this.setState({ user: getuserData.data })
    console.log(this.state)
  }


  _onSelect = async (i) => {
    const { users } = this.state;
    await this.setState({
      selected: users[i].mobile
    })
  }

  SendMoney = () => {

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
