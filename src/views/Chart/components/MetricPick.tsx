import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const FETCH_METRICS_QUERY = gql`
    query {
        getMetrics
    }
`;

interface ResultData {
    getMetrics: string[]
}

interface IMetricPickProps {
    setSelected: (selected: () => string[]) => void;
}

const components = makeAnimated();

const MetricPick = ({ setSelected }: IMetricPickProps) => {
    const onChange = (metrics: any[]) => {
        setSelected(() => metrics ?
            metrics.map((op: { value: any; }) => op.value)
            :
            []
        );
    };
    return (
        <Query query={FETCH_METRICS_QUERY}>
            {
                ({ loading, error, data }: QueryResult<ResultData>) => {
                    if (loading) return <>Loading...</>;
                    if (error) return <>`Error! ${error.message}`</>;
                    const options = data && data.getMetrics.map((metric) => ({
                        value: metric,
                        label: metric
                    }));
                    return (
                        <Select
                            options={options}
                            components={components}
                            isMulti
                            // @ts-ignore
                            onChange={onChange}
                            closeMenuOnSelect={false}
                        />
                    );
                }}
        </Query>
    )
}

export default MetricPick;