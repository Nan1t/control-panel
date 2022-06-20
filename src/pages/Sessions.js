import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";

class Sessions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container p-3">
                <h2>Активные сессии</h2>
                <div className="row">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Пользователь</th>
                            <th scope="col">Токен</th>
                            <th scope="col">Агент</th>
                            <th scope="col">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        <Session login="test" token="000-000-dvfg-vdsdfvfd" agent="Mozilla"/>
                        <Session login="vasya" token="000-000-dvfg-vdsdfvfd" agent="Mozilla"/>
                        </tbody>
                    </table>
                    <button className="btn btn-danger">
                        <i className="bi bi-trash-fill"></i>
                        <span className="ms-2">Завершить все</span>
                    </button>
                </div>
            </div>
        );
    }
}

function Session(props) {
    return (
        <tr>
            <th scope="row">{props.login}</th>
            <td>{props.token}</td>
            <td>{props.agent}</td>
            <td>
                <button className="btn btn-danger w-auto">
                    <i className="bi bi-trash-fill"></i>
                    <span className="ms-2">Завершить</span>
                </button>
            </td>
        </tr>
    );
}

export default Sessions;