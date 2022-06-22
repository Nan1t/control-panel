import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import {client} from "../client";

class Consult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                url: "",
                dayPoint: {
                    col: 0,
                    row: 0
                },
                teacherPoint: {
                    col: 0,
                    row: 0
                }
            },
            saved: true
        }
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        const cli = client();

        cli.get("/consult").then((resp) => {
            this.setState({data: resp.data});
        }).catch((e) => {
            console.log("Error: " + e);
        });
    }

    render() {
        let spinnerClasses = "spinner-border ms-3";
        if (this.state.saved) {
            spinnerClasses += " visually-hidden";
        }

        return (
            <div className="container p-3">
                <h2>Расписание консультаций</h2>
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
                <h5>Начальная позиция дня недели</h5>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="dayCol" className="form-label">Столбец</label>
                            <input
                                type="number"
                                className="form-control"
                                id="dayCol"
                                value={this.state.data.dayPoint.col}
                                onChange={(e)=>{
                                    let data = this.state.data;
                                    data.dayPoint.col = e.target.value;
                                    this.setState({data: data});
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="dayRow" className="form-label">Строка</label>
                            <input
                                type="number"
                                className="form-control"
                                id="dayRow"
                                value={this.state.data.dayPoint.row}
                                onChange={(e)=>{
                                    let data = this.state.data;
                                    data.dayPoint.row = e.target.value;
                                    this.setState({data: data});
                                }}
                            />
                        </div>
                    </div>
                </div>
                <h5>Начальная позиция преподавателя</h5>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="teacherCol" className="form-label">Столбец</label>
                            <input
                                type="number"
                                className="form-control"
                                id="teacherCol"
                                value={this.state.data.teacherPoint.col}
                                onChange={(e)=>{
                                    let data = this.state.data;
                                    data.teacherPoint.col = e.target.value;
                                    this.setState({data: data});
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="teacherRow" className="form-label">Строка</label>
                            <input
                                type="number"
                                className="form-control"
                                id="teacherRow"
                                value={this.state.data.teacherPoint.row}
                                onChange={(e)=>{
                                    let data = this.state.data;
                                    data.teacherPoint.row = e.target.value;
                                    this.setState({data: data});
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-primary w-auto" onClick={this.save}>Сохранить</button>
                    <div className={spinnerClasses} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    save() {
        this.setState({saved: false});
        const cli = client();

        cli.post("/consult", this.state.data).then((resp) => {
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

export default Consult;