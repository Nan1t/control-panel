import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";

class Teachers extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container p-3">
                <h2>Расписание преподавателей</h2>
                <div className="row">
                    <div className="mb-3">
                        <label htmlFor="formUrl" className="form-label">Ссылка на документ</label>
                        <input type="url" className="form-control" id="formUrl"/>
                    </div>
                </div>
                <h5>Ассоциации</h5>
                <button className="btn btn-primary w-auto mb-3">
                    <i className="bi bi-plus-lg"></i>
                    Добавить
                </button>
                <div className="row">
                    <Association keyword="test" sheetLink="test"/>
                    <Association keyword="test" sheetLink="test"/>
                    <Association keyword="test" sheetLink="test"/>
                    <Association keyword="test" sheetLink="test"/>
                </div>
                <div className="row">
                    <button className="btn btn-primary">Сохранить</button>
                </div>
            </div>
        );
    }
}

function Association(props) {
    return (
        <div className="row">
            <div className="col-6">
                <div className="mb-3">
                    <input type="text" className="form-control" value={props.keyword}/>
                </div>
            </div>
            <div className="col-5">
                <div className="mb-3">
                    <input type="number" className="form-control" value={props.sheetLink} />
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

export default Teachers;