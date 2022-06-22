import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import {default as axios} from "axios";
import {api} from "../client";

class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                courses: []
            },
            saved: true
        }
        this.addCourse = this.addCourse.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        axios.get(api("/courses")).then((resp) => {
            this.setState({data: resp.data});
        }).catch((e) => {
            console.log("Error: " + e);
        });
    }

    render() {
        let spinnerClasses = "spinner-border ms-3";
        let courses = [];

        if (this.state.saved) {
            spinnerClasses += " visually-hidden";
        }

        for (let i in this.state.data.courses) {
            let course = this.state.data.courses[i];
            courses.push(
                <Course
                    key={i}
                    courseName={course.name}
                    fileUrl={course.url}
                    dayCol={course.dayPoint.col}
                    dayRow={course.dayPoint.row}
                    groupCol={course.groupPoint.col}
                    groupRow={course.groupPoint.row}
                    onEdit={(obj) => {
                        let data = this.state.data;
                        let courses = data.courses;
                        courses[i] = {...courses[i], ...obj};
                        this.setState({data: data});
                    }}
                    onDelete={()=>{
                        let data = this.state.data;
                        let courses = data.courses;
                        courses.splice(parseInt(i), 1);
                        this.setState({data: data});
                    }}
                />
            );
        }

        return (
            <div className="container p-3">
                <h2>Расписание курсов</h2>
                <button className="btn btn-primary w-auto" onClick={this.addCourse}>
                    <i className="bi bi-plus-lg"></i>
                    Добавить
                </button>
                <div className="row mb-3">
                    {courses}
                </div>
                <button className="btn btn-primary w-auto" onClick={this.save}>Сохранить все</button>
                <div className={spinnerClasses} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    addCourse() {
        let data = this.state.data;
        data.courses.push({
            url: "[Отредактируй меня]",
            name: "[Новый курс]",
            dayPoint: {
                col: 0,
                row: 0
            },
            groupPoint: {
                col: 0,
                row: 0
            }
        });
        this.setState({data: data});
        setTimeout(()=>{
            window.scrollTo(0, document.body.scrollHeight);
        }, 100);
    }

    save() {
        this.setState({saved: false});

        axios.post(api("/courses"), this.state.data).then((resp) => {
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

function Course(props) {
    return (
        <div className="col-xs-12 col-lg-6 col-xl-4 p-2">
            <div className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Название курса</label>
                        <input
                            type="text"
                            className="form-control"
                            value={props.courseName}
                            onChange={(e)=>props.onEdit({name: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ссылка на документ</label>
                        <input
                            type="url"
                            className="form-control"
                            value={props.fileUrl}
                            onChange={(e)=>props.onEdit({url: e.target.value})}
                        />
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
                                    value={props.dayCol}
                                    onChange={(e)=>props.onEdit({dayPoint: {col: e.target.value, row: props.dayRow}})}
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
                                    value={props.dayRow}
                                    onChange={(e)=>props.onEdit({dayPoint: {col: props.dayCol, row: e.target.value}})}
                                />
                            </div>
                        </div>
                    </div>
                    <h5>Начальная позиция группы</h5>
                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="groupCol" className="form-label">Столбец</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="groupCol"
                                    value={props.groupCol}
                                    onChange={(e)=>props.onEdit({groupPoint: {col: e.target.value, row: props.groupRow}})}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="groupRow" className="form-label">Строка</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="groupRow"
                                    value={props.groupRow}
                                    onChange={(e)=>props.onEdit({groupPoint: {col: props.groupCol, row: e.target.value}})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <button className="btn btn-danger w-auto me-3" onClick={props.onDelete}>
                            <i className="bi bi-trash-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;