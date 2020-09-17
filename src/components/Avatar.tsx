import Avatar from '@material-ui/core/Avatar'
import { Theme, withStyles } from '@material-ui/core/styles'

const styles = (theme: Theme) => ({
    root: {
        background: theme.palette.primary.main,
        marginRight: '1rem',
    },
})

export default withStyles(styles)(Avatar)
