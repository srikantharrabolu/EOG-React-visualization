import React from 'react'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    grow: {
        flexGrow: 1,
    },
})

export default () => {
    const classes = useStyles()

    const name = "Srikanth's"
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.grow}
                >
                    {name} EOG React Visualization Assessment
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
