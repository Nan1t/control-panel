import {getApiToken} from "./storage";

export function client() {
    const config = getConfig();
    const token = getApiToken();
    let headers = {};

    if (token != null) {
        headers['Authorization'] = token;
    }

    return require('axios').create({
        baseURL: config["api_url"],
        params:{},
        headers: headers
    });
}

function getConfig() {
    let data = null;
    let req = new XMLHttpRequest();
    req.open("GET", "/config.json", false);

    req.onload = (e) => {
        data = JSON.parse(req.responseText);
    }

    req.send();

    return data;
}