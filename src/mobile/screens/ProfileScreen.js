import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Icon, Button, Text } from 'react-native-elements'
import styles from '../assets/styles'
import { connect } from 'react-redux'
import { cleanFiles } from '../redux/actions/files'
import { logout } from '../redux/actions/session'

const mapStateToProps = ({ buttonLoading, session: { userId } }) => ({
    buttonLoading,
    loggedIn: Boolean(userId)
})

const mapDispatchToProps = dispatch => ({
    cleanFiles: () => dispatch(cleanFiles()),
    logout: () => dispatch(logout())
})

const ProfileScreen = ({ navigation: { navigate }, cleanFiles, logout, buttonLoading, loggedIn }) => {
    const _signOutAsync = async () => {
        cleanFiles()
        logout()
    }

    useEffect(() => {
        if (!loggedIn) navigate('Auth')
    }, [loggedIn])
    
    return (
        <View style={styles.wrapper}>
            <View style={styles.containerHeader}>
                <Text h3>Your Profile</Text>
            </View>
            
            <View style={styles.topContainer}>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Sign Out"
                        loading={buttonLoading}
                        onPress={_signOutAsync} 
                    />
                </View>
            </View>
        </View>
    )
}

ProfileScreen.navigationOptions = {
    tabBarIcon: () => (
        <Icon type="antdesign" name="user" size={20} />
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileScreen)