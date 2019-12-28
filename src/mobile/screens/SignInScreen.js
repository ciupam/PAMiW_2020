import React, { useState } from 'react'
import { View, AsyncStorage, ActivityIndicator } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { Formik } from 'formik'
import styles from '../assets/styles'

export default ({ navigation: { navigate } }) => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const _signInAsync = async values => {
        setLoading(true)
        const response = await fetch('https://pamw-backend.herokuapp.com/api/user/login', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
        })
        const data = await response.json()
        
        if (response.ok) {
            await AsyncStorage.setItem('accessToken', data.accessToken)
            await AsyncStorage.setItem('firstname', data.firstname)
            await AsyncStorage.setItem('userId', data.userId)
            navigate('App')
        } else {
            setLoading(false)
            setError(data.message)
        }
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
                    <View style={{ marginBottom: 20 }}>
                        <Text h1>Sign In</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Input
                            placeholder="login"
                            onChangeText={handleChange('login')}
                            onBlur={handleBlur('login')}
                            value={values.login}
                            leftIcon={{ type: 'antdesign', name: error ? 'frowno' : 'smileo' }}
                            leftIconContainerStyle={styles.leftIconContainer}
                            label="Your login"
                            errorMessage={error}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Input 
                            placeholder="password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                            leftIcon={{ type: 'antdesign', name: 'lock' }}
                            leftIconContainerStyle={styles.leftIconContainer}
                            label="Password"
                        />
                    </View>
                    
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Submit" 
                            loading={loading}
                            onPress={handleSubmit} 
                        />
                    </View>
                </View>
            )}
        </Formik>
    )
}