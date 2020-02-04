export function viewStateSelector(state, id){
    return state.views.byId ? state.views.byId[id] : undefined
}