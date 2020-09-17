import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { red, green, indigo, pink, blue, yellow } from '@material-ui/core/colors';
import { useSelector } from 'react-redux'


const unitAdder = (value: number): string => {
    if (value >= 1000) {
        return (value / 1000).toString() + 'K';
    } else {
        return value.toString();
    }
}

const lineColors = [red[600], pink[500], blue[500], yellow[500], indigo[400], green[500]]

const ChartGraph = ({ selectedMetrics, getYAxisIDFor, axes }: any) => {
    const { metrics } = useSelector((state: any) => state.metrics);
    const data = Object.keys(metrics).map(key => metrics[key])

    return <ResponsiveContainer>
        <LineChart
            width={600}
            height={600}
            data={data}
        >
            {
                selectedMetrics.map((metric: any, index: number) =>
                    <Line
                        key={index}
                        yAxisId={getYAxisIDFor(metric)}
                        dataKey={metric}
                        stroke={lineColors[index]}
                        dot
                        activeDot
                    />

                )
            }
            {
                selectedMetrics.length > 0 &&
                <XAxis dataKey="at" interval={150} />
            }
            {
                axes.percentage &&
                <YAxis
                    label={{ value: '%', position: 'insideTopLeft', offset: 0, fill: '#908e8e', dy: 10, dx: 10, angle: -90 }}
                    yAxisId={0}
                    orientation="left"
                    stroke={'#908e95'}
                    domain={[0, 100]}
                    ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                    tick={{ fontSize: 11 }}
                />
            }
            {
                axes.pressure &&
                <YAxis
                    label={{ value: 'PSI', position: 'insideTopLeft', offset: 0, fill: '#908e8e', fontSize: 12, dy: 15, dx: 10, angle: -90 }}
                    yAxisId={1}
                    orientation="left"
                    stroke={'#908e8f'}
                    tick={{ fontSize: 11 }}
                    tickFormatter={unitAdder}
                />
            }
            {
                axes.temp &&
                <YAxis
                    label={{ value: 'F', position: 'insideTopLeft', offset: 0, fill: '#908e8e', fontSize: 12, dy: 10, dx: 10, angle: -90 }}
                    yAxisId={2}
                    orientation="left"
                    stroke={'#908e8f'}
                    tick={{ fontSize: 11 }}
                    tickFormatter={unitAdder}
                />
            }
            <Tooltip />
        </LineChart>
    </ResponsiveContainer>
}

export default ChartGraph