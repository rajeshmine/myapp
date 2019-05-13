import React, { PureComponent } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import './dashboard.css';
import { NavLink } from 'react-router-dom';
import { transaction } from '../../service/TransactionService';
import { getuser } from '../../service/jwtdecode';
import Navigation from "../common/navbar";


export default class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
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

  render() {
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
              <h4>Total Amount</h4>
              <p>30</p>
            </div>
            <div>
              <h4>Total Amount</h4>
              <p>30</p>
            </div>
            <div>
              <h4>Total Amount</h4>
              <p>30</p>
            </div>
            <div>
              <h4>Total Amount</h4>
              <p>30</p>
            </div>
          </div>

        </MuiThemeProvider>
      </div>
    )
  }
}
