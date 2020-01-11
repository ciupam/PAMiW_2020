import React from 'react'
import { StatusBar } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { HomeScreen, LoginScreen, ProfileScreen, AuthLoadingScreen, FilesScreen } from './screens'
import { ThemeProvider } from 'react-native-elements'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { Provider } from 'react-redux'
import store from './redux/store'

const AppBottomTab = createBottomTabNavigator({ Home: HomeScreen, Files: FilesScreen, Profile: ProfileScreen })
const AuthStack = createStackNavigator({ Login: LoginScreen }, { headerMode: 'none' })

const RootStack = createSwitchNavigator(
  { 
    AuthLoading: AuthLoadingScreen,
    App: AppBottomTab,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

const AppContainer = createAppContainer(RootStack)

export default () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <StatusBar hidden />
      <AppContainer />
    </ThemeProvider>
  </Provider>
)

const theme = {
  Button: {
    raised: true
  }
}
