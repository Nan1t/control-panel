import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";

class Users extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                        <User login="test" isAdmin="false"/>
                        <User login="vasya" isAdmin="false"/>
                        </tbody>
                    </table>
                </div>
                <h2>Создание пользователя</h2>
                <div className="row">
                    <div className="mb-3">
                        <label htmlFor="login" className="form-label">Логин</label>
                        <input type="text" className="form-control" id="login" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordConfirm" className="form-label">Повтор пароля</label>
                        <input type="password" className="form-control" id="passwordConfirm" />
                    </div>
                    <div className="mb-3 ms-3 form-check">
                        <input className="form-check-input" type="checkbox" value="" id="isAdmin" />
                        <label className="form-check-label" htmlFor="isAdmin">Администратор</label>
                    </div>
                </div>
                <button className="btn btn-primary w-auto">
                    <i className="bi bi-plus-lg"></i>
                    Создать
                </button>
            </div>
        );
    }
}

function User(props) {
    return (
        <tr>
            <th scope="row">{props.login}</th>
            <td>{props.isAdmin ? "Да" : "Нет"}</td>
            <td>
                <button className="btn btn-primary w-auto">
                    <i className="bi bi-pencil-fill"></i>
                </button>
                <button className="btn btn-danger w-auto ms-1">
                    <i className="bi bi-trash-fill"></i>
                </button>
            </td>
        </tr>
    );
}

export default Users;