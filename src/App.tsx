import React from 'react'
import createStore from './store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import 'react-toastify/dist/ReactToastify.css'
import Chart from './views/Chart/Chart';
import api from './store/api';
import { ApolloProvider } from 'react-apollo';
import Header from './components/Header'


const store = createStore();
const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(39,49,66)',
        },
        secondary: {
            main: 'rgb(197,208,222)',
        },
        background: {
            default: 'rgb(226,231,238)',
        },
    },
});

const App: React.FC = () => (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={api.client}>
            <Provider store={store}>
                <Header />
                <Chart />
            </Provider>
        </ApolloProvider>
    </MuiThemeProvider>
)

export default App
