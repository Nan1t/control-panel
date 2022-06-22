import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import {default as axios} from "axios";
import {api} from "../client";

class Teachers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                url: "https://nope.com",
                associations: {}
            },
            abbreviation: null,
            sheetLink: null,
            saved: true
        }
        this.save = this.save.bind(this);
        this.addAssoc = this.addAssoc.bind(this);
    }

    componentDidMount() {
        axios.get(api("/teachers")).then((resp) => {
            this.setState({data: resp.data});
        }).catch((e) => {
            console.log("Error: " + e);
        });
    }

    render() {
        let spinnerClasses = "spinner-border ms-3";
        let keys = Object.keys(this.state.data.associations);
        let associations = [];

        if (this.state.saved) {
            spinnerClasses += " visually-hidden";
        }

        for (let key in keys) {
            let abbr = keys[key];
            let sheetLink = this.state.data.associations[abbr];
            associations.push(
                <Association
                    key={key}
                    abbreviation={abbr}
                    sheetLink={sheetLink}
                    onRemove={()=>{
                        let data = this.state.data;
                        delete data.associations[abbr];
                        this.setState({data: data});
                    }}
                />
            );
        }

        return (
            <div className="container p-3">
                <h2>Расписание преподавателей</h2>
                <div className="row">
                    <div className="mb-3">
                        <label htmlFor="formUrl" className="form-label">Ссылка на документ</label>
                        <input
                            type="url"
                            className="form-control"
                            id="formUrl"
                            value={this.state.data.url}
                            onChange={(e)=>{
                                let data = this.state.data;
                                data.url = e.target.value;
                                this.setState({data: data});
                            }}
                        />
                    </div>
                </div>
                <h3>Ассоциации</h3>
                <div className="row mb-3">
                    <div className="col-8">
                        <label htmlFor="abbreviation" className="form-label">Условное сокращение</label>
                        <input
                            type="text"
                            className="form-control"
                            id="abbreviation"
                            onChange={(e)=>{
                                this.setState({abbreviation: e.target.value});
                            }}
                        />
                    </div>
                    <div className="col-4">
                        <label htmlFor="linkTo" className="form-label">Ссылается на</label>
                        <input
                            type="text"
                            className="form-control"
                            id="linkTo"
                            onChange={(e)=>{
                                this.setState({sheetLink: e.target.value});
                            }}
                        />
                    </div>
                </div>
                <button className="btn btn-primary" onClick={this.addAssoc}>Добавить</button>
                <div className="row">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Условное сокращение</th>
                            <th scope="col">Ссылается на</th>
                            <th scope="col">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {associations}
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <button className="btn btn-primary w-auto" onClick={this.save}>
                        Сохранить
                    </button>
                    <div className={spinnerClasses} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    addAssoc() {
        let abbr = this.state.abbreviation;
        let link = this.state.sheetLink;

        if (abbr != null && link != null) {
            let assoc = this.state.data.associations;

            if (assoc[abbr] === undefined) {
                assoc[abbr] = link;
                let data = this.state.data;
                data.associations = assoc;
                this.setState({data: data});
            }
        }
    }

    save() {
        this.setState({saved: false});

        axios.post(api("/teachers"), this.state.data).then((resp) => {
            this.setState({saved: true});

            if (resp.data["success"] === true) {
                console.log("Saved!");
            } else {
                console.log("Error!");
            }
        }).catch((e) => {
            this.setState({saved: true});
            console.log("Error: " + e);
        });
    }
}

function Association(props) {
    return (
        <tr>
            <td>{props.abbreviation}</td>
            <td>{props.sheetLink}</td>
            <td>
                <button className="btn btn-danger" onClick={props.onRemove}>
                    <i className="bi bi-trash-fill"></i>
                </button>
            </td>
        </tr>
    );
}

export default Teachers;