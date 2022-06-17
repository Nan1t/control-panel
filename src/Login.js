import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import "./Login.css";
import {api} from "./client";
import {setApiToken} from "./storage";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: null,
            password: null,
            error: null
        };
        this.inputLogin = this.inputLogin.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
        this.login = this.login.bind(this);
        this.setError = this.setError.bind(this);
    }

    render() {
        return (
            <div className="container d-flex align-items-center justify-content-center">
                <form onSubmit={(e) => {
                    this.login();
                    e.preventDefault();
                }}>
                    <div className="mb-3">
                        <label htmlFor="fieldLogin" className="form-label">Логин</label>
                        <input type="text" className="form-control" id="fieldLogin" onChange={this.inputLogin}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fieldPassword" className="form-label">Пароль</label>
                        <input type="password" className="form-control" id="fieldPassword" onChange={this.inputPassword} />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Войти" onClick={this.login} />
                    <span className="text-danger">{this.state.error != null ? this.state.error : ""}</span>
                </form>
            </div>
        );
    }

    inputLogin(e) {
        this.setState({login: e.target.value});
    }

    inputPassword(e) {
        this.setState({password: e.target.value});
    }

    login() {
        const login = this.state.login;
        const password = this.state.password;

        if (login == null || password == null)
            return;

        this.setState({error: null});

        const axios = require('axios').default;

        axios.post(api("/login"), {
            login: login,
            password: password
        }).then((resp) => {
            let token = resp.data["accessToken"];

            if (token) {
                setApiToken(token);
                this.props.setToken(token)
            } else {
                this.setError(resp.data["error"]);
            }
        }).catch((e) => {
            this.setError(e.message);
        });
    }

    setError(msg) {
        this.setState({error: msg});
    }
}

export default Login;