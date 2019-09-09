import {userConstants} from "../constants/constants";

export const LOGIN = 'LOGIN';

import APIRequest from "../components/common/APIRequest.jsx";

const apiRequestLogin = new APIRequest("login/", () => {}, () => {});


export const userActions = {
    login,
    logout,
    register
};

function login(username_email, password) {
    console.log("Logging in: " + username_email + " " + password);
    apiRequestLogin.call({"username": username_email, "password": password});
    return { type: LOGIN };
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {

}