import { APPS_STATE_CHANGE_ACTION } from '../../actions/views/apps'

function transformEntityState(state, payload, options){
    return Object.assign({}, state, { rows: payload.partialStateValue.value, totalCount: payload.partialStateValue["@odata.count"] }, options);
}

function reducer(state = {}, action){
    if (action.type === APPS_STATE_CHANGE_ACTION) {
        const payload = action.payload
        switch (payload.partialStateName) {
            case 'executeApiSauce':
                return transformEntityState(state, payload, {isLoaded: true});
            case 'executeApiError':
                return state; //TODO: 如果请求数据失败并且返回状态为401时，跳转到登录界面
            default:
                break;
        }
        return Object.assign({}, state, {[payload.partialStateName]: payload.partialStateValue});
    }
    return state;
}

export default reducer