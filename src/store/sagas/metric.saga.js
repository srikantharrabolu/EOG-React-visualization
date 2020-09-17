import { takeEvery, take, call, put, fork, select } from 'redux-saga/effects'
import * as actions from '../actions'
import api from '../api';
import { eventChannel } from 'redux-saga';


function* mergeSaga(list) {
    let data = yield select(state => state.metrics.metrics);
    list.map(item => {
        const { metric, at, value } = item;
        const hours = new Date(at).getHours() % 12 || 12;
        const minutes = new Date(at).getMinutes()
        const timeAt = `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}`
        data = {
            ...data,
            [at]: {
                ...data[at],
                [metric]: value,
                at: timeAt,
            },
        }
        return null;
    })
    yield put({ type: actions.MULTIPLE_DATA_UNITS_RECEIVED, metrics: data })
}

function* preProcessSaga({ metric, at, value }) {
    let data = yield select(state => state.metrics.metrics);
    const oldlatestValue = yield select(state => state.metrics.latestValue)
    const hours = new Date(at).getHours() % 12 || 12;
    const minutes = new Date(at).getMinutes()
    const timeAt = `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}`
    data = {
        ...data,
        [at]: {
            ...data[at],
            [metric]: value,
            at: timeAt,
        },
    };
    const latestValue = {
        ...oldlatestValue,
        [metric]: value
    }
    yield put({ type: actions.METRICS_INFO_RECEIVED, metrics: data, latestValue })
}


const createSubscription = sub => eventChannel((emit) => {
    const handler = (data) => {
        emit(data);
    };
    sub.subscribe(handler);
    return () => {
        sub.unsubscribe()
    };
})


function* fetch30MinutesData(action) {
    const { data } = yield call(api.last30MinsData, action.metricName)
    const newData = data.getMeasurements
    yield fork(mergeSaga, newData)
}

function* liveUpdates(action) {
    const sub = yield call(api.liveSubscribe);
    const subscription = yield call(createSubscription, sub);
    while(true) {
        const {data} = yield take(subscription);
        yield fork(preProcessSaga, data.newMeasurement)
    }
}


function* watchForFetch() {
    yield takeEvery(actions.FETCH_HALF_AN_HOURS_DATA, fetch30MinutesData);
}

function* watchForLiveUpdates() {
    yield takeEvery(actions.START_REAL_TIME_UPDATES, liveUpdates)
}

export default [watchForFetch, watchForLiveUpdates];