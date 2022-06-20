import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";

class Courses extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container p-3">
                <h2>Расписание курсов</h2>
                <button className="btn btn-primary w-auto">
                    <i className="bi bi-plus-lg"></i>
                    Добавить
                </button>
                <div className="row">
                    <Course
                        courseName="Test"
                        fileUrl="https://test.com"
                        dayCol="0"
                        dayRow="0"
                        groupCol="0"
                        groupRow="0"
                    />
                    <Course
                        courseName="Test"
                        fileUrl="https://test.com"
                        dayCol="0"
                        dayRow="0"
                        groupCol="0"
                        groupRow="0"
                    />
                    <Course
                        courseName="Test"
                        fileUrl="https://test.com"
                        dayCol="0"
                        dayRow="0"
                        groupCol="0"
                        groupRow="0"
                    />
                    <Course
                        courseName="Test"
                        fileUrl="https://test.com"
                        dayCol="0"
                        dayRow="0"
                        groupCol="0"
                        groupRow="0"
                    />
                </div>
                <div className="row">
                    <button className="btn btn-primary">Сохранить</button>
                </div>
            </div>
        );
    }
}

function Course(props) {
    return (
        <div className="col-xs-12 col-lg-6 p-2">
            <div className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Название курса</label>
                        <input type="text" className="form-control" value={props.courseName}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ссылка на документ</label>
                        <input type="url" className="form-control" value={props.fileUrl}/>
                    </div>
                    <h5>Начальная позиция дня недели</h5>
                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="dayCol" className="form-label">Столбец</label>
                                <input type="number" className="form-control" id="dayCol" value={props.dayCol}/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="dayRow" className="form-label">Строка</label>
                                <input type="number" className="form-control" id="dayRow" value={props.dayRow}/>
                            </div>
                        </div>
                    </div>
                    <h5>Начальная позиция группы</h5>
                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="groupCol" className="form-label">Столбец</label>
                                <input type="number" className="form-control" id="groupCol" value={props.groupCol}/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="groupRow" className="form-label">Строка</label>
                                <input type="number" className="form-control" id="groupRow" value={props.groupRow}/>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <button className="btn btn-danger w-auto">
                            <i className="bi bi-trash-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;