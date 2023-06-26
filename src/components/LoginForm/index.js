import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {
    userIdInput: '',
    userPinInput: '',
    showSubmitError: false,
    errorMsg: '',
  }

  userIdInputChange = event => {
    this.setState({userIdInput: event.target.value})
  }

  userPinInputChange = event => {
    this.setState({userPinInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  userFormInput = async event => {
    event.preventDefault()
    const {userIdInput, userPinInput} = this.state
    const userDetails = {userIdInput, userPinInput}
    const url = 'https://apis.ccbp.in/ebank/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
    console.log(response.ok)
  }

  render() {
    const {showSubmitError, errorMsg, userIdInput, userPinInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="img-main"
          />
        </div>
        <div>
          <h1>Welcome Back</h1>
          <form onSubmit={this.userFormInput}>
            <label className="label" htmlFor="userId">
              User ID
            </label>
            <input
              id="userId"
              value={userIdInput}
              onChange={this.userIdInputChange}
              placeholder="Enter user id"
              className="input"
              type="text"
            />
            <label className="label" htmlFor="userPin">
              PIN
            </label>
            <input
              type="password"
              id="userPin"
              value={userPinInput}
              onChange={this.userPinInputChange}
              placeholder="Enter Pin"
              className="input"
            />
            <button className="btn-login" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
