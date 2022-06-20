import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container p-3">
                <h2>Статистика</h2>
                <div className="row">
                    <Stats name="Пользователей" value={0}/>
                    <Stats name="Всего подписок" value={0}/>
                    <Stats name="Подписок на препод." value={0}/>
                    <Stats name="Подписок на консультации" value={0}/>
                    <Stats name="Подписок на курсы" value={0}/>
                    <Stats name="Подписок на группы" value={0}/>
                    <Stats name="Подписок на оценки" value={0}/>
                </div>
            </div>
        );
    }
}

function Stats(props) {
    return (
        <div className="col-xs-12 col-md-6 col-lg-3 col-xl-2">
            <div className="card text-white bg-primary mb-3">
                <div className="card-header">{props.name}</div>
                <div className="card-body">
                    <h5 className="card-title">{props.value}</h5>
                </div>
            </div>
        </div>
    );
}

export default Home;