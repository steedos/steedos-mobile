import _ from 'underscore';
import { RequestStatusOption } from '../constants'

export function creatorAppsSelector(state) {
    let apps = state.entities ? state.entities.apps : {};
    let assigned_apps = state.entities ? state.entities.assigned_apps : [];
    let adminApp, sortedApps;

    _.each(apps, function (app, key) {
        if (!app._id) {
            app._id = key;
        }
        if (app.is_creator) {
        } else {
            app.visible = false;
        }
    });

    sortedApps = _.sortBy(_.values(apps), 'sort');

    let creatorApps = {};

    adminApp = {};

    _.each(sortedApps, function (n) {
        if (n._id === "admin") {
            return adminApp = n;
        } else {
            return creatorApps[n._id] = n;
        }
    });

    creatorApps.admin = adminApp;

    if (assigned_apps.length) {
        _.each(creatorApps, function (app, key) {
            if (assigned_apps.indexOf(key) > -1) {
                app.visible = app.is_creator;
            } else {
                app.visible = false;
            }
        });
    }
    return creatorApps;
}

export function visibleAppsSelector(state, includeAdmin = true){
    let creatorApps = creatorAppsSelector(state);
    var apps = [];
    _.each(creatorApps, function (v, k) {
        if ((v.visible !== false && v._id !== "admin") || (includeAdmin && v._id === "admin")) {
            apps.push(v);
        }
    });
    return apps;
}

export function isRequestStarted(state){
    return state.requests.bootStrap.getBootStrap.status === RequestStatusOption.STARTED
}

export function isRequestSuccess(state){
    return state.requests.bootStrap.getBootStrap.status === RequestStatusOption.SUCCESS
}

export function isRequestFailure(state){
    return state.requests.bootStrap.getBootStrap.status === RequestStatusOption.FAILURE
}

export function getRequestStatus(state){
    return state.requests.bootStrap.getBootStrap.status
}

export function getRequestError(state){
    return state.requests.bootStrap.getBootStrap.error
}

export function getBootstrapData(state){
    return state.entities
}