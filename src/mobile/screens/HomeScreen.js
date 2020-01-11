import React, { useEffect } from 'react'
import { View, AsyncStorage } from 'react-native'
import { Text, Icon, Button, Overlay } from 'react-native-elements'
import styles from '../assets/styles'
import { connect } from 'react-redux'
import { addFiles } from '../redux/actions/files'

const mapStateToProps = ({ session }) => ({
    session
})

const mapDispatchToProps = dispatch => ({
    addFiles: session => dispatch(addFiles(session))
})

const HomeScreen = ({ addFiles, session: { userId, accessToken } }) => {
    useEffect(() => {
        (async () => {
            if (userId) addFiles({ accessToken, userId })
        })()
    })

    return (
        <View style={styles.wrapper}>

            <View style={styles.containerHeader}>
                <Text h3>Your Posts</Text>
            </View>

            <View style={styles.topContainer}>
                <Button
                    title="Add post"
                    type="clear"
                />
            </View>

            <View style={styles.containerHeader}>
                <Text h3>Other Posts</Text>
            </View>

            <View style={styles.topContainer}>

            </View>

        </View>
    )
}

HomeScreen.navigationOptions = {
    tabBarIcon: () => (
        <Icon type="antdesign" name="home" size={20} />
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen)