import React, { PureComponent } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import './transaction.css';
import { NavLink } from 'react-router-dom';
import { list } from '../../service/TransactionService';
import Navigation from "../common/navbar";

import { getuser } from '../../service/jwtdecode';
export default class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      user: { mobile: '' }
    }
  }
  componentDidMount() {
    this.init();

  }

  init = async () => {
    let getuserData = await getuser();
    await this.setState({ user: getuserData.data });
    await this.transactionHistory();
    console.log(this.state)
  }

  transactionHistory = async () => {
    const { user: { mobile } } = this.state;
    console.log(mobile)
    let transactionhistory = await list();
    if (transactionhistory.data) {
      let transactions = transactionhistory.data.message;
      console.log(transactions)
      transactions = await transactions.filter(v => (+v.sender) === +mobile || (+v.recipient) === +mobile)
      await this.setState({ transactions })
    }

  }

  render() {
    const { transactions, user: { mobile } } = this.state
    console.log(transactions)
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Transaction History"
            />
          </div>
          <Navigation />

          <div className="transactionDiv">
            {transactions && transactions.map(v =>
              <div>
                <h4>Sender: {v.sender}</h4>
                <h4>Recipient : {v.recipient}</h4>
                <p>Amount: {+v.sender === +mobile ? '-' + v.amount : '+' + v.amount}</p>
              </div>
            )}

          </div>

        </MuiThemeProvider>
      </div>
    )
  }
}
