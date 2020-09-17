import React, { useCallback, useState, useEffect } from 'react'
import {
    Grid,
    makeStyles,
} from '@material-ui/core'
import * as actions from '../../store/actions'
import MetricSelect from './components/MetricPick';
import ChartGraph from './components/ChartGraph';
import { useDispatch } from 'react-redux'
import CardSection from './components/CardDomain';

const useStyles = makeStyles(theme => ({
    container: {
        width: '100vw',
        height: '100vh',
    },
    main: {
        padding: theme.spacing(3),
        background: 'white'
    },
}));


const Chart: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const subscribeLiveUpdates = useCallback(() => {
        dispatch({
            type: actions.START_REAL_TIME_UPDATES
        })
    }, [dispatch])

    const getPastData = useCallback((metricName: string) => {
        dispatch({
            type: actions.FETCH_HALF_AN_HOURS_DATA,
            metricName
        })
    }, [dispatch])

    const [metrics, setSelectedMetricsState] = useState<string[]>([])
    const [axes, setAxes] = useState({
        pressure: false,
        percentage: false,
        temp: false,
    })

    useEffect(() => {
        subscribeLiveUpdates()
    }, [subscribeLiveUpdates])

    const getYAxisIDFor = (metric: string) => metric.toLowerCase().endsWith('pressure') ? 1 : (metric.toLowerCase().endsWith('temp') ? 2 : 0);

    const handleSelect = (selected: () => string[]) => {
        const sMetrics = selected();
        if (metrics.length < sMetrics.length) {
            getPastData(sMetrics[sMetrics.length - 1])
        }
        setAxes({
            percentage: sMetrics.some((m: string) => getYAxisIDFor(m) === 0),
            pressure: sMetrics.some((m: string) => getYAxisIDFor(m) === 1),
            temp: sMetrics.some((m: string) => getYAxisIDFor(m) === 2)
        })
        setSelectedMetricsState(() => selected())
    }
    return (
        <main className={classes.main}>
            <Grid container>
                <Grid container item xs={12} spacing={4}>
                    <Grid item container spacing={2} direction='row-reverse'>
                        <Grid item xs={12} md={6} lg={5}>
                            <MetricSelect setSelected={handleSelect} />
                        </Grid>
                        <Grid item lg={7} md={6} xs={12}>
                            <Grid container spacing={2}>
                                <CardSection selectedMetrics={metrics} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className={classes.container} item container xs={12} justify='center' alignItems='center'>
                        <ChartGraph
                            selectedMetrics={metrics}
                            getYAxisIDFor={getYAxisIDFor}
                            axes={axes}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </main>
    )
}

export default Chart
