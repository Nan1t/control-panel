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
            checkRate: 0,
            dayIndexes: {
                "Test": 0,
                "hello": 1
            },
            compAuds: [],
        }

        this.addDay = this.addDay.bind(this);
        this.remDay = this.remDay.bind(this);
    }

    componentDidMount() {
        axios.get(api("/properties")).then((resp) => {
            this.setState(resp.data);
        }).catch((e) => {
            console.log("Error: " + e);
        });
    }

    render() {
        let days = [];
        let keys = Object.keys(this.state.dayIndexes);

        for (let key in keys) {
            let name = keys[key];
            let index = this.state.dayIndexes[name];
            days.push(<Day
                dayName={name}
                dayIndex={index}
                onRemove={()=>this.remDay(name)}
                onNameChange={()=>{}}
                onIndexChange={()=>{}}
            />);
        }

        return (
            <div className="container p-3">
                <h2>Общие настройки</h2>
                <div className="row">
                    <div className="mb-3">
                        <label htmlFor="formRate" className="form-label">Период проверки</label>
                        <input type="number"
                               className="form-control"
                               id="formRate" aria-describedby="rateHelp"
                               value={this.state.checkRate}
                               onChange={(e) => this.setState({checkRate: e.target.value})}
                        />
                        <div id="rateHelp" className="form-text">Период проверки расписания в секундах</div>
                    </div>
                </div>
                <h3>Дни недели</h3>
                <button className="btn btn-primary w-auto" onClick={this.addDay}>
                    <i className="bi bi-plus-lg"></i>
                    Добавить
                </button>
                <div className="row">
                    <div className="col-6">
                        <h6 className="text-center">День недели</h6>
                    </div>
                    <div className="col-5">
                        <h6 className="text-center">Индекс</h6>
                    </div>
                    <div className="row">
                        {days}
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-primary">Сохранить</button>
                </div>
            </div>
        );
    }

    addDay() {
        let days = this.state.dayIndexes;

        if (days[""]) {
            console.log("Exists");
            return;
        }

        days[""] = -1;
        this.setState({dayIndexes: days});
    }

    remDay(dayName) {
        let days = this.state.dayIndexes;
        delete days[dayName];
        this.setState({dayIndexes: days});
    }
}

function Day(props) {
    return (
        <div className="row">
            <div className="col-6">
                <div className="mb-3">
                    <input type="text" className="form-control" value={props.dayName} onChange={props.onNameChange}/>
                </div>
            </div>
            <div className="col-5">
                <div className="mb-3">
                    <input type="number" className="form-control" value={props.dayIndex} onChange={props.onIndexChange}/>
                </div>
            </div>
            <div className="col-1">
                <button className="btn btn-danger" onClick={props.onRemove}>
                    <i className="bi bi-trash-fill"></i>
                </button>
            </div>
        </div>
    );
}

export default General;