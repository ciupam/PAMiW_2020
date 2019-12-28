import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import styles from '../assets/styles'

const Home = ({ navigation: { navigate } }) => (
    <View style={styles.container}>
        <Text>Home Screen</Text>
    </View>
)

Home.navigationOptions = ({ navigation }) => ({
    tabBarIcon: () => (
        <Icon name="home" size={20} />
    )
})

export default Home