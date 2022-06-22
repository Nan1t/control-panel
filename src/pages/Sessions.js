import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import {client} from "../client";
import {getApiToken} from "../storage";

class Sessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: []
        }
        this.endSession = this.endSession.bind(this);
    }

    componentDidMount() {
        const cli = client();

        cli.get("/user/sessions").then((resp) => {
            this.setState(resp.data);
        }).catch((e) => {
            console.log("Error: " + e);
        });
    }

    render() {
        let sessions = [];

        for (let i in this.state.sessions) {
            let session = this.state.sessions[i];
            sessions.push(<Session
                key={i}
                login={session.login}
                token={session.token}
                agent={session.agent}
                onDelete={()=>this.endSession(parseInt(i), session.token)}
            />);
        }

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
                        {sessions}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    endSession(index, token) {
        const cli = client();

        cli.post("/user/endSession", {
            token: token,
        }).then((resp) => {
            if (resp.data["success"] === true) {
                let sessions = this.state.sessions;
                sessions.splice(index, 1);
                this.setState({sessions: sessions});

                if (token === getApiToken()) {
                    this.props.onResetSession();
                }
            } else {
                alert("Ошибка: " + resp.data["error"]);
            }
        }).catch((e) => {
            alert("Ошибка: " + e);
        });
    }
}

function Session(props) {
    return (
        <tr>
            <th scope="row">{props.login}</th>
            <td>{props.token}</td>
            <td>{props.agent}</td>
            <td>
                <button className="btn btn-danger w-auto" onClick={props.onDelete}>
                    <i className="bi bi-trash-fill"></i>
                    <span className="ms-2">Завершить</span>
                </button>
            </td>
        </tr>
    );
}

export default Sessions;