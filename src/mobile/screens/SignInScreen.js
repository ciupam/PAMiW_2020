import React from 'react'
import { View, AsyncStorage } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { Formik } from 'formik'
import styles from '../assets/styles'

export default ({ navigation: { navigate } }) => {
    const _signInAsync = async values => {
        const response = await fetch('https://pamw-backend.herokuapp.com/api/user/login', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
        })
        const data = await response.json()

        if (response.ok) await AsyncStorage.setItem('authToken', 'abc')
        console.log(data)
    }

    return (
        <Formik
            initialValues={{
                login: '',
                password: ''
            }}
            onSubmit={values => _signInAsync(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.container}>
                    <View style={styles.alignContainer}>
                        <Text h1>Sign In</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Input
                            placeholder="login"
                            onChangeText={handleChange('login')}
                            onBlur={handleBlur('login')}
                            value={values.login}
                            autoCompleteType="username"
                            leftIcon={{ type: 'antdesign', name: 'smileo' }}
                            leftIconContainerStyle={styles.leftIconContainer}
                            label="Your login"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Input 
                            placeholder="password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            autoCompleteType="password"
                            secureTextEntry
                            leftIcon={{ type: 'antdesign', name: 'lock' }}
                            leftIconContainerStyle={styles.leftIconContainer}
                            label="Password"
                        />
                    </View>
                    
                    <View style={styles.alignContainer}>
                        <Button onPress={handleSubmit} title="Submit" />
                    </View>
                </View>
            )}
        </Formik>
    )
}