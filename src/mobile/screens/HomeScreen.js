import React from 'react'
import { View } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import styles from '../assets/styles'

const Home = ({ navigation: { navigate } }) => (
    <View style={styles.container}>
        <View style={styles.alignContainer}>
            <Text h3>Home Screen</Text>
        </View>
    </View>
)

Home.navigationOptions = ({ navigation }) => ({
    tabBarIcon: () => (
        <Icon type="antdesign" name="home" size={20} />
    )
})

export default Home