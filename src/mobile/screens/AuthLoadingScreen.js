import React, { useEffect } from 'react'
import styles from '../assets/styles'
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View
} from 'react-native'
import { connect } from 'react-redux'

const mapStateToProps = ({ session: { userId }}) => ({
    loggedIn: Boolean(userId)
})

const AuthLoadingScreen = ({ navigation: { navigate }, loggedIn }) => {
    const _bootstrapAsync = async () => {
        navigate(loggedIn ? 'App' : 'Auth')
    }

    useEffect(() => {
        _bootstrapAsync()
    }, [])

    return (
        <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
    )
}

export default connect(
    mapStateToProps
)(AuthLoadingScreen)