import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";

class Consult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container p-3">
                <h2>Расписание консультаций</h2>
                <div className="row">
                    <div className="mb-3">
                        <label htmlFor="formUrl" className="form-label">Ссылка на документ</label>
                        <input type="url" className="form-control" id="formUrl"/>
                    </div>
                </div>
                <h5>Начальная позиция дня недели</h5>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="dayCol" className="form-label">Столбец</label>
                            <input type="number" className="form-control" id="dayCol"/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="dayRow" className="form-label">Строка</label>
                            <input type="number" className="form-control" id="dayRow"/>
                        </div>
                    </div>
                </div>
                <h5>Начальная позиция преподавателя</h5>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="teacherCol" className="form-label">Столбец</label>
                            <input type="number" className="form-control" id="teacherCol"/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="teacherRow" className="form-label">Строка</label>
                            <input type="number" className="form-control" id="teacherRow"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-primary">Сохранить</button>
                </div>
            </div>
        );
    }
}

export default Consult;