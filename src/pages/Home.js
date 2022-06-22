import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import {client} from "../client";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: 0,
            subsTeacher: 0,
            subsConsult: 0,
            subsCourse: 0,
            subsGroup: 0,
            subsPoints: 0
        }
    }

    componentDidMount() {
        const cli = client();

        cli.get("/stats").then((resp) => {
            this.setState(resp.data);
        }).catch((e) => {
            console.log("Error: " + e);
        });
    }

    render() {
        let users = this.state.users;
        let subsTeacher = this.state.subsTeacher;
        let subsConsult = this.state.subsConsult;
        let subsCourse = this.state.subsCourse;
        let subsGroup = this.state.subsGroup;
        let subsPoints = this.state.subsPoints;

        let all = subsTeacher
            + subsCourse
            + subsConsult
            + subsGroup
            + subsPoints

        return (
            <div className="container p-3">
                <h2>Статистика</h2>
                <div className="row">
                    <Stats name="Пользователей" value={users}/>
                    <Stats name="Всего подписок" value={all}/>
                    <Stats name="Подписок на препод." value={subsTeacher}/>
                    <Stats name="Подписок на консультации" value={subsConsult}/>
                    <Stats name="Подписок на курсы" value={subsCourse}/>
                    <Stats name="Подписок на группы" value={subsGroup}/>
                    <Stats name="Подписок на оценки" value={subsPoints}/>
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