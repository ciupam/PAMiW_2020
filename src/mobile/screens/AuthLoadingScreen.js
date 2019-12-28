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
        const accessToken = await AsyncStorage.getItem('accessToken')
        navigate(accessToken ? 'App' : 'Auth')
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