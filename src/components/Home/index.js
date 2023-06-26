import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="home-logo"
        />
        <button
          className="nav-mobile-btn"
          onClick={onClickLogout}
          type="button"
        >
          Logout
        </button>
      </div>
      <h1>Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
        className="card-img"
      />
    </>
  )
}

export default Home
