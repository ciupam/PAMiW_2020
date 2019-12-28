import React, { useEffect } from 'react'
import styles from '../assets/styles'
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View
} from 'react-native'

export default ({ navigation: { navigate } }) => {
    const _bootstrapAsync = async () => {
        const authToken = await AsyncStorage.getItem('authToken')
        navigate(authToken ? 'App' : 'Auth')
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