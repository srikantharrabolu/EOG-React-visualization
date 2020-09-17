import { IAction, IMetricState } from '../../types';
import * as actions from '../actions';

interface IHandler {
  [key: string]: (state: IMetricState, action: IAction) => IMetricState;
}

const initialState: IMetricState = {
  metrics: {},
  latestValue: {},
};

const singleMetricsDataReceived = (state: IMetricState, { metrics, latestValue }: IAction): IMetricState => ({
  ...state,
  metrics,
  latestValue,
});

const multipleMetricsDataReceived = (state: IMetricState, { metrics }: IAction): IMetricState => {
  return {
    ...state,
    metrics,
  };
};

const handlers: IHandler = {
  [actions.METRICS_INFO_RECEIVED]: singleMetricsDataReceived,
  [actions.MULTIPLE_DATA_UNITS_RECEIVED]: multipleMetricsDataReceived,
};

export default (state = initialState, action: IAction) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
