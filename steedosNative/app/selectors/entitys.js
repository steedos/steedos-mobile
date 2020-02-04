export function entityStateSelector(state, entityName){
    return state.entities ? state.entities[entityName] : undefined
}

export function getObject(state, objectName){
    return state.entities ? state.entities.objects[objectName] : undefined
}