import React, { PureComponent } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import './dashboard.css';
import { NavLink } from 'react-router-dom';
import { transaction } from '../../service/TransactionService';
import { getuser } from '../../service/jwtdecode';
import Navigation from "../common/navbar";
import { list } from '../../service/TransactionService';

export default class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      transactions: [],
      receivemoney: 0,
      sendmoney: 0,
    }
  }
  componentDidMount() {
    this.init();

  }

  init = async () => {
    let getuserData = await getuser();
    await this.setState({ user: getuserData.data })
    await this.transactionHistory();
    console.log(this.state)
  }


  transactionHistory = async () => {
    const { user: { mobile } } = this.state;
    console.log(mobile)
    let sendmoney = 0;
    let receivemoney = 0;
    let transactionhistory = await list();
    if (transactionhistory.data) {
      let transactions = transactionhistory.data.message;
      console.log(transactions)
      transactions = await transactions.filter(v => (+v.sender) === mobile || (+v.recipient) === mobile)
      await transactions.filter(v => (+v.sender) === mobile ? sendmoney += (+v.amount) : sendmoney)
      await transactions.filter(v => (+v.recipient) === mobile ? receivemoney += (+v.amount) : receivemoney)
      console.log(sendmoney)
      await this.setState({ transactions, sendmoney, receivemoney })
    }

  }
  render() {
    const { transactions, user: { mobile }, sendmoney, receivemoney } = this.state
    console.log(transactions, sendmoney, receivemoney)
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Dashboard"
            />
          </div>
          <Navigation />
          <div className="flexDiv">
            <div>
              <h4>Total Transactions</h4>
              <p>{transactions.length}</p>
            </div>
            <div>
              <h4>Total Amount Send</h4>
              <p>{sendmoney}</p>
            </div>
            <div>
              <h4>Total Amount Received</h4>
              <p>{receivemoney}</p>
            </div>

          </div>

        </MuiThemeProvider>
      </div>
    )
  }
}
