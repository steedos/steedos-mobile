import { createAction } from './base'

export var SETTINGS_STATE_CHANGE_ACTION = 'SETTINGS_STATE_CHANGE';

export function createSettingsAction(partialStateName, partialStateValue) {
    return createAction(SETTINGS_STATE_CHANGE_ACTION, partialStateName, partialStateValue, {})
}

export function changeSteedosService(steedosService){
    return createSettingsAction('changeSteedosService', {steedosService})
}