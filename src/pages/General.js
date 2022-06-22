import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import {default as axios} from "axios";
import {api} from "../client";

class General extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                checkRate: 0,
                dayIndexes: {},
                compAuds: [],
            },
            saved: true,
            addDayName: null,
            addDayIndex: -1
        }

        this.addDay = this.addDay.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        axios.get(api("/properties")).then((resp) => {
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

        let keys = Object.keys(this.state.data.dayIndexes);
        let dayIndexes = [];

        for (let i in keys) {
            let name = keys[i];
            let index = this.state.data.dayIndexes[name];
            dayIndexes.push(<Day
                key={i}
                dayName={name}
                dayIndex={index}
                onRemove={()=>{
                    let data = this.state.data;
                    delete data.dayIndexes[name];
                    this.setState({data: data});
                }}
            />);
        }

        return (
            <div className="container p-3">
                <h2>Общие настройки</h2>
                <div className="row">
                    <div className="mb-3 w-auto">
                        <label htmlFor="formRate" className="form-label">Период проверки</label>
                        <input type="number"
                               className="form-control"
                               id="formRate" aria-describedby="rateHelp"
                               value={this.state.data.checkRate}
                               onChange={(e) => {
                                   let data = this.state.data;
                                   data.checkRate = e.target.value;
                                   this.setState({data: data});
                               }}
                        />
                        <div id="rateHelp" className="form-text">Период проверки расписания в секундах</div>
                    </div>
                </div>
                <h3>Дни недели</h3>
                <div className="row mb-3">
                    <div className="col-8">
                        <label htmlFor="dayName" className="form-label">Название дня</label>
                        <input
                            type="text"
                            className="form-control"
                            id="dayName"
                            onChange={(e)=>{
                                this.setState({addDayName: e.target.value});
                            }}
                        />
                    </div>
                    <div className="col-4">
                        <label htmlFor="dayIndex" className="form-label">Индекс</label>
                        <input
                            type="number"
                            className="form-control"
                            id="dayIndex"
                            onChange={(e)=>{
                                this.setState({addDayIndex: e.target.value});
                            }}
                        />
                    </div>
                </div>
                <button className="btn btn-primary" onClick={this.addDay}>Добавить</button>
                <div className="row">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">День</th>
                            <th scope="col">Индекс</th>
                            <th scope="col">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dayIndexes}
                        </tbody>
                    </table>
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

    addDay() {
        let name = this.state.addDayName;
        let index = this.state.addDayIndex;

        if (name != null && index > -1) {
            let indexes = this.state.data.dayIndexes;

            if (indexes[name] === undefined) {
                indexes[name] = index;
                let data = this.state.data;
                data.dayIndexes = indexes;
                this.setState({data: data});
            }
        }
    }

    save() {
        this.setState({saved: false});

        axios.post(api("/properties"), this.state.data).then((resp) => {
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

function Day(props) {
    return (
        <tr>
            <td>{props.dayName}</td>
            <td>{props.dayIndex}</td>
            <td>
                <button className="btn btn-danger" onClick={props.onRemove}>
                    <i className="bi bi-trash-fill"></i>
                </button>
            </td>
        </tr>
    );
}

export default General;