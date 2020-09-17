import React from 'react';
import MetricCard from './MetricBoard';
import {useSelector} from 'react-redux';
import { IState } from '../../../store';

interface IProps {
    selectedMetrics: string[];
}

const CardDomain: React.FC<IProps> = ({ selectedMetrics }) => {
    const latestValue = useSelector<IState, { [key: string]: string }>(state => state.metrics.latestValue)
    return <>
        {
            selectedMetrics.map((s, key) => (
                <MetricCard key={key}
                    currentValue={latestValue[s]}
                    title={s}
                />
            ))
        }
    </>
}

export default CardDomain