export function getApiToken() {
    return localStorage.getItem("apiToken");
}

export function setApiToken(token) {
    localStorage.setItem("apiToken", token);
}

export function getLogin() {
    let login = localStorage.getItem("apiLogin");
    if (login == null)
        login = "guest";
    return login;
}

export function setLogin(login) {
    localStorage.setItem("apiLogin", login);
}

export function isAdmin() {
    return localStorage.getItem("isAdmin");
}

export function setAdmin(isAdmin) {
    localStorage.setItem("isAdmin", isAdmin);
}