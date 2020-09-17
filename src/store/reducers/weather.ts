import * as actions from '../actions'
import { IDataReceivedAction, IWeatherState } from '../../types'

const initialState: IWeatherState = {
    temperatureinCelsius: null,
    temperatureinFahrenheit: null,
    description: '',
    locationName: '',
}

const toF = (c: number) => (c * 9) / 5 + 32

const weatherDataRecevied = (
    state: IWeatherState,
    action: IDataReceivedAction
) => {
    const { getWeatherForLocation } = action
    const {
        description,
        locationName,
        temperatureinCelsius,
    } = getWeatherForLocation

    return {
        temperatureinCelsius,
        temperatureinFahrenheit: toF(temperatureinCelsius),
        description,
        locationName,
    }
}

const handlers = {
    [actions.WEATHER_INFO_RECEIVED]: weatherDataRecevied,
}

export default (state = initialState, action: any) => {
    // @ts-ignore
    const handler = handlers[action.type]
    if (typeof handler === 'undefined') return state
    return handler(state, action)
}
