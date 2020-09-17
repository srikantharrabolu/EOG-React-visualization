import { ApolloClient } from 'apollo-client'
import { getMainDefinition } from 'apollo-utilities'

import gql from 'graphql-tag'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const wsLink = new WebSocketLink({
    uri: `ws://react.eogresources.com/graphql`,
    options: {
        reconnect: true,
    },
})

const httpLink = new HttpLink({
    uri: 'https://react.eogresources.com/graphql',
})

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    httpLink
)

const cache = new InMemoryCache()

const client = new ApolloClient({
    cache,
    link,
})

const last30MinsData = async (metricName: any) => {
    const thirtyMinAgo = new Date(new Date().getTime() - 30 * 60000).getTime()
    return await client.query({
        query: gql`
        {
            getMeasurements(
            input: {
                metricName: "${metricName}"
                after: ${thirtyMinAgo}
            }
            ) {
            at
            metric
            value
            unit
            }
        }
    `,
    })
}

const liveSubscribe = async () =>
    await client.subscribe({
        query: gql`
            subscription {
                newMeasurement {
                    at
                    metric
                    value
                    unit
                }
            }
        `,
    })

export default { client, liveSubscribe, last30MinsData }
