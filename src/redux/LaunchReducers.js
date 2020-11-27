export function LaunchReducers(state={processing:false},action){
    switch (action.type) {
        case 'setLaunches':
            state = {...state};
            state['launchList'] = action.payload;
            state['processing'] = false;
            return state;
        
        case 'filterLaunches':
            state = {...state};
            state['processing'] = true;
            return state;
    
        default:
            return state;
    }
}