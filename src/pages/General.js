import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";

class General extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container p-3">
                <h2>Общие настройки</h2>
                <div className="row">
                    <div className="mb-3">
                        <label htmlFor="formRate" className="form-label">Период проверки</label>
                        <input type="number" className="form-control" id="formRate" aria-describedby="rateHelp" />
                        <div id="rateHelp" className="form-text">Период проверки расписания в секундах</div>
                    </div>
                </div>
                <h3>Дни недели</h3>
                <button className="btn btn-primary w-auto">
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
                        <Day dayName="Hello" dayIndex="1"/>
                        <Day dayName="Hello 2" dayIndex="2"/>
                        <Day dayName="Hello 3" dayIndex="3"/>
                        <Day dayName="Hello 4" dayIndex="4"/>
                    </div>
                </div>
                <h3>Компьютерные аудитории</h3>
                <button className="btn btn-primary w-auto mb-3">
                    <i className="bi bi-plus-lg"></i>
                    Добавить
                </button>
                <div className="row">
                    <Classroom crName="Test" />
                    <Classroom crName="Test" />
                    <Classroom crName="Test" />
                    <Classroom crName="Test" />
                </div>
                <div className="row">
                    <button className="btn btn-primary">Сохранить</button>
                </div>
            </div>
        );
    }
}

function Day(props) {
    return (
        <div className="row">
            <div className="col-6">
                <div className="mb-3">
                    <input type="text" className="form-control" value={props.dayName}/>
                </div>
            </div>
            <div className="col-5">
                <div className="mb-3">
                    <input type="number" className="form-control" value={props.dayIndex} />
                </div>
            </div>
            <div className="col-1">
                <button className="btn btn-danger">
                    <i className="bi bi-trash-fill"></i>
                </button>
            </div>
        </div>
    );
}

function Classroom(props) {
    return (
        <div className="row">
            <div className="col-11">
                <div className="mb-3">
                    <input type="text" className="form-control" value={props.crName} />
                </div>
            </div>
            <div className="col-1">
                <button className="btn btn-danger">
                    <i className="bi bi-trash-fill"></i>
                </button>
            </div>
        </div>
    );
}

export default General;