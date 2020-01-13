import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    topContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    containerHeader: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20
    },
    wrapper: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      height: '100%'
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
    },
    absoluteLeftTop: {
      position: 'absolute',
      top: 10,
      left: 10
    },
    fileItem: {
      width: '100%'
    }
  })