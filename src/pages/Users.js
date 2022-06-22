import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import {client} from "../client";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { users: [] },
            newLogin: "",
            newPassword: "",
            newPasswordConfirm: "",
            newIsAdmin: false,
        }
        this.createUser = this.createUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        const cli = client();

        cli.get("/user/list").then((resp) => {
            this.setState({data: resp.data});
        }).catch((e) => {
            console.log("Error: " + e);
        });
    }

    render() {
        let users = [];

        for (let i in this.state.data.users) {
            let user = this.state.data.users[i];
            users.push(<User
                key={i}
                login={user.login}
                isAdmin={user.isAdmin}
                onDelete={()=>this.deleteUser(parseInt(i), user.login)}
            />);
        }

        return (
            <div className="container p-3">
                <h2>Пользователи панели</h2>
                <div className="row">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Логин</th>
                            <th scope="col">Администратор</th>
                            <th scope="col">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users}
                        </tbody>
                    </table>
                </div>
                <h2>Создание пользователя</h2>
                <div className="row">
                    <div className="mb-3">
                        <label htmlFor="login" className="form-label">Логин</label>
                        <input
                            type="text"
                            className="form-control"
                            id="login"
                            value={this.state.newLogin}
                            onChange={(e)=>this.setState({newLogin: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={this.state.newPassword}
                            onChange={(e)=>this.setState({newPassword: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordConfirm" className="form-label">Повтор пароля</label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordConfirm"
                            value={this.state.newPasswordConfirm}
                            onChange={(e)=>this.setState({newPasswordConfirm: e.target.value})}
                        />
                    </div>
                    <div className="mb-3 ms-3 form-check">
                        <label className="form-check-label" htmlFor="isAdmin">Администратор</label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="isAdmin"
                            checked={this.state.newIsAdmin}
                            onChange={(e)=>this.setState({newIsAdmin: e.target.value})}
                        />
                    </div>
                </div>
                <button className="btn btn-primary w-auto" onClick={this.createUser}>
                    <i className="bi bi-plus-lg"></i>
                    Создать
                </button>
            </div>
        );
    }

    createUser() {
        const cli = client();
        let login = this.state.newLogin;
        let password = this.state.newPassword;
        let isAdmin = this.state.newIsAdmin;

        if (password !== this.state.newPasswordConfirm) {
            alert("Пароли не совпадают");
            return;
        }

        cli.post("/user/create", {
            login: login,
            password: password,
            isAdmin: isAdmin
        }).then((resp) => {
            if (resp.data["success"] === true) {
                let data = this.state.data;
                let users = data.users;
                users.push({
                    login: login,
                    isAdmin: isAdmin
                });
                this.setState({
                    data: data,
                    newLogin: "",
                    newPassword: "",
                    newPasswordConfirm: "",
                    newIsAdmin: false,
                });
            } else {
                alert("Ошибка: " + resp.data["error"]);
            }
        }).catch((e) => {
            alert("Ошибка: " + e);
        });
    }

    deleteUser(index, login) {
        const cli = client();

        cli.post("/user/delete", {
            login: login,
        }).then((resp) => {
            if (resp.data["success"] === true) {
                let data = this.state.data;
                let users = data.users;
                users.splice(index, 1);
                this.setState({data: data});
            } else {
                alert("Ошибка: " + resp.data["error"]);
            }
        }).catch((e) => {
            alert("Ошибка: " + e);
        });
    }
}

function User(props) {
    return (
        <tr>
            <th scope="row">{props.login}</th>
            <td>{props.isAdmin ? "Да" : "Нет"}</td>
            <td>
                <button className="btn btn-danger w-auto ms-1" onClick={props.onDelete}>
                    <i className="bi bi-trash-fill"></i>
                </button>
            </td>
        </tr>
    );
}

export default Users;