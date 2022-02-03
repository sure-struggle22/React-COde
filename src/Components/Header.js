import React from "react";
import "../Styles/header.css";
import GoogleLogin from "react-google-login";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "antiquewhite",
    border: "1px solid brown",
  },
};
const customStyles1 = {
  content: {
    top: "10%",
    left: "10%",
    right: "auto",
    bottom: "auto",
    marginRight: "10%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "red",
    border: "1px solid brown",
  },
};

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loginModalIsOpen: false,
      customloginModalIsOpen: false,
      isLoggedIn: false,
      loggedInUser: undefined,
      userEmail: undefined,
      password: undefined,
    };
  }

  responseGoogle = (response) => {
    this.setState({
      isLoggedIn: true,
      loggedInUser: response.profileObj.name,
      loginModalIsOpen: false,
    });
  };

  handleModal = (state, value) => {
    this.setState({ [state]: value });
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false, loggedInUser: undefined });
  };
  handleCustomLogin = (state, value) => {
    this.setState({ [state]: value });
  };
  handleFormDataChange = (event, state) => {
    this.setState({ [state]: event.target.value });
  };

  render() {
    const {
      loginModalIsOpen,
      loggedInUser,
      isLoggedIn,
      customloginModalIsOpen,
    } = this.state;
    return (
      <div>
        <div class="header">
          <div class="header-logo">
            <i class="fas fa-hamburger"></i>
          </div>
          {!isLoggedIn ? (
            <div class="user-group">
              <div
                class="login"
                onClick={() => this.handleModal("loginModalIsOpen", true)}
              >
                Login
              </div>
              <div class="signup">Create an account</div>
            </div>
          ) : (
            <div class="user-group">
              <div class="login">{loggedInUser}</div>
              <div class="signup" onClick={this.handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
        <Modal isOpen={loginModalIsOpen} style={customStyles}>
          <div>
            <div
              class="glyphicon glyphicon-remove"
              style={{ float: "right", marginBottom: "10px" }}
              onClick={() => this.handleModal("loginModalIsOpen", false)}
            ></div>
            <GoogleLogin
              clientId="214934564540-vi1l5qarbeve27k6pi3u6bah5efqbu55.apps.googleusercontent.com"
              buttonText="Continue with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <br />
            <button
              class="btn btn-light"
              onClick={() => {
                this.handleModal("loginModalIsOpen", false);
                this.handleCustomLogin("customloginModalIsOpen", true);
              }}
            >
              Continue with Credentials
            </button>
          </div>
        </Modal>
        <Modal isOpen={customloginModalIsOpen} style={customStyles}>
          <div>
            <div
              class="glyphicon glyphicon-remove"
              style={{ float: "right", marginBottom: "10px" }}
              onClick={() => this.handleModal("customloginModalIsOpen", false)}
            ></div>
            <h2>Welcome</h2>
            <div>
              <label>UserName : </label>
              <input
                class="form-control"
                style={{ width: "400px" }}
                type="text"
                placeholder="Enter your UserName"
                onChange={(event) =>
                  this.handleFormDataChange(event, "userEmail")
                }
              />
            </div>
            <div>
              <label>Password : </label>
              <input
                class="form-control"
                style={{ width: "400px" }}
                type="text"
                placeholder="Enter your Email"
                onChange={(event) =>
                  this.handleFormDataChange(event, "password")
                }
              />
            </div>
            <div style={{ padding: "10px" }}>
              <button>Login</button>
              <button style={{ marginLeft: "5px" }}>Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Header;
