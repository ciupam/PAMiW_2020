import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import useStyles from '../Assets/useStyles'
import { Link } from 'react-router-dom'
import { logout } from '../../../actions/session'

const mapStateToProps = ({ session }) => ({ session })

const mapDispatchToProps = dispatch => ({ logout: () => dispatch(logout()) })

const LoginHeader = ({ session, logout }) => {
    const classes = useStyles()
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography 
                    variant="h6" 
                    className={classes.title}
                >
                    Hi, {session.firstname}!
                </Typography>

                <Link to='/profile'>
                    <Button
                        className={classes.button} 
                        color="inherit"
                    >
                        Profile
                    </Button>
                </Link>

                <Button 
                    className={classes.button}
                    variant="contained"
                    onClick={logout}
                >
                    Sign Out
                </Button>

            </Toolbar>
        </AppBar>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginHeader)