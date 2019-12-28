import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputContainer: {
      width: '90%',
      height: 90
    },
    buttonContainer: {
      width: '30%'
    },
    leftIconContainer: {
      marginRight: 10,
      marginLeft: 5
    },
    absoluteButtonContainer: {
      position: 'absolute',
      bottom: 10,
      right: 10
    }
  })