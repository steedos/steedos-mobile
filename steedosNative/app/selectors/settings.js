export function settingsStateSelector(state){
    return state.settings ? state.settings: undefined
}

export function dataServicesSelector(state){
    return state.settings ? state.settings.services.steedos: undefined
}