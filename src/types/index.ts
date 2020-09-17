import { Action } from 'redux'

export interface IWeatherState {
    temperatureinCelsius: null
    temperatureinFahrenheit: null
    description: string
    locationName: string
}

export interface IDataReceivedAction extends Action {
    getWeatherForLocation: {
        description: string
        locationName: string
        temperatureinCelsius: number
    }
    type: string
}

export interface IMetricState {
    metrics: any
    latestValue: {
        [key: string]: string
    }
}

export interface IAction extends Action {
    type: string
    metrics?: any
    latestValue?: any
}
