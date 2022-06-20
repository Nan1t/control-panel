import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import {getApiToken, getLogin} from "./storage";
import React from "react";
import Login from "./Login";
import Home from "./pages/Home";
import General from "./pages/General";
import Teachers from "./pages/Teachers";
import Consult from "./pages/Consult";
import Courses from "./pages/Courses";
import Rendering from "./pages/Rendering";
import Users from "./pages/Users";
import Sessions from "./pages/Sessions";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiToken: getApiToken()
        };
        this.setToken = this.setToken.bind(this);
    }

    render() {
        if (this.state.apiToken != null) {
            return <Panel />;
        }
        return <Login setToken={this.setToken} />;
    }

    setToken(token) {
        this.setState({apiToken: token});
    }
}

class Panel extends React.Component {
    constructor(props) {
        super(props);
        let pages = new Map();
        this.setupPages(pages);

        this.state = {
            page: 0,
            pages: pages
        };

        this.setPage = this.setPage.bind(this);
    }

    setupPages(pages) {
        pages.set(0, <Home />);
        pages.set(1, <General />);
        pages.set(2, <Teachers />);
        pages.set(3, <Consult />);
        pages.set(4, <Courses />);
        pages.set(5, <Rendering />);
        pages.set(6, <Users />);
        pages.set(7, <Sessions />);
    }

    render() {
        let pageId = this.state.page;
        let page = this.state.pages.get(pageId);

        return (
            <div className="container-fluid bg-light">
                <div className="row">
                    <div className="sticky-md-top col-sm-12 col-md-4 col-lg-2 vh-100 p-0 bg-dark text-white h-100">
                        <div className="dropdown m-2">
                            <button
                                className="btn btn-secondary dropdown-toggle w-100"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {getLogin()}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href="#">Выйти</a></li>
                            </ul>
                        </div>
                        <div className="list-group">
                            <Link text="Главная" icon="bi-house-fill" callback={() => this.setPage(0)} active={pageId === 0}/>
                            <Link text="Общие настройки" icon="bi-gear-fill" callback={() => this.setPage(1)} active={pageId === 1}/>
                            <Link text="Преподаватели" icon="bi-file-earmark-person-fill" callback={() => this.setPage(2)} active={pageId === 2}/>
                            <Link text="Консультации" icon="bi-chat-text-fill" callback={() => this.setPage(3)} active={pageId === 3}/>
                            <Link text="Курсы" icon="bi-people-fill" callback={() => this.setPage(4)} active={pageId === 4}/>
                            <Link text="Рендеринг" icon="bi-image-fill" callback={() => this.setPage(5)} active={pageId === 5}/>
                            <hr className="m-2"/>
                            <Link text="Пользователи" icon="bi-person-fill" callback={() => this.setPage(6) } active={pageId === 6}/>
                            <Link text="Сессии" icon="bi-journal-text" callback={() => this.setPage(7)} active={pageId === 7}/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-10">
                        {page}
                    </div>
                </div>
            </div>
        );
    }

    setPage(page) {
        this.setState({page: page});
    }
}

function Link(props) {
    let classes = "sb-link p-2";

    if (props.active) {
        classes += " active";
    }

    return (
        <div className={classes} onClick={props.callback}>
            <i className={"bi " + props.icon}></i>
            <span>{props.text}</span>
        </div>
    );
}

export default App;