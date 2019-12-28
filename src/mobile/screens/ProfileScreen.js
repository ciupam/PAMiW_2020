import React from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import styles from '../assets/styles'

const Profile = ({ navigation: { navigate } }) => {
    const _signOutAsync = async () => {
        await AsyncStorage.clear()
        navigate('Auth')
    }
    
    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <Button 
                title="Sign out" 
                onPress={_signOutAsync}
            />
        </View>
    )
}

Profile.navigationOptions = {
    tabBarIcon: () => (
        <Icon type="antdesign" name="user" size={20} />
    )
}

export default Profile