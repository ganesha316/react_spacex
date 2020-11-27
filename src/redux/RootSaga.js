import axios from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';

/* function* LaunchListGenerator(action){
    try{
        var result = yield call(launchList);
        yield put({type: 'setLaunches', payload: result.data});
    }
    catch(error){
        console.log(error);
    }
}

function launchList(){
    return axios.get('https://api.spaceXdata.com/v3/launches?limit=100');
}*/

function* LaunchFilterListGenerator(action){
    
    try {
        var result = yield call(launchFilterList,action);
        yield put({type: 'setLaunches', payload: result.data});
    } catch (error) {
        console.log(error);
    }
}

function launchFilterList(action) {
    let url = 'https://api.spaceXdata.com/v3/launches?limit=100';
    let filter = action.payload.filter;
    let params = '';
    for (const key in filter) {
        if(filter[key]){
            params += `&${key}=${filter[key]}`;
        }
    }
    // console.log('params',params);
    return axios.get(url + params);
}

export function* rootSaga(){
    // yield takeEvery('fetchList', LaunchListGenerator);
    yield takeEvery('filterLaunches', LaunchFilterListGenerator);
}