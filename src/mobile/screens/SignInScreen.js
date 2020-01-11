import React, { useEffect } from 'react'
import { View, AsyncStorage, ActivityIndicator } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { Formik } from 'formik'
import styles from '../assets/styles'
import { connect } from 'react-redux'
import { login } from '../redux/actions/session'

const mapStateToProps = ({ buttonLoading, errors, session: { userId } }) => ({
    buttonLoading,
    errors,
    loggedIn: Boolean(userId)
})

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user))
})

const SignInScreen = ({ navigation: { navigate }, login, buttonLoading, errors, loggedIn }) => {
    const _signInAsync = values => {
        login(values)
    }

    useEffect(() => {
        if (loggedIn) navigate('App')
    }, [loggedIn])

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
                            leftIcon={{ type: 'antdesign', name: errors ? 'frowno' : 'smileo' }}
                            leftIconContainerStyle={styles.leftIconContainer}
                            label="Your login"
                            errorMessage={errors}
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
                            loading={buttonLoading}
                            onPress={handleSubmit} 
                        />
                    </View>
                </View>
            )}
        </Formik>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInScreen)