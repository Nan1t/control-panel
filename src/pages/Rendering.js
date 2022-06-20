import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";

class Rendering extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container p-3">
                <h2>Настройки рендеринга</h2>
                <div className="row">
                    <div className="mb-3">
                        <label htmlFor="selectFormat" className="form-label">Формат выходного изображения</label>
                        <select id="selectFormat" className="form-select w-auto">
                            <option selected>Формат выходного изображения</option>
                            <option value="JPEG">JPEG</option>
                            <option value="PNG">PNG</option>
                            <option value="GIF">GIF</option>
                        </select>
                    </div>
                    <div className="mb-3 w-auto">
                        <label htmlFor="dpi" className="form-label">Качество</label>
                        <input type="number" className="form-control" id="dpi" aria-describedby="dpiHelp" />
                        <div id="dpiHelp" className="form-text">Количество точек (пикселей) на дюйм</div>
                    </div>
                    <div className="row">
                        <button className="btn btn-primary">Сохранить</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Rendering;