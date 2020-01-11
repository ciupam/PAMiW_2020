import React from 'react'
import { View } from 'react-native'
import { Text, Icon, Button } from 'react-native-elements'
import styles from '../assets/styles'
import * as DocumentPicker from 'expo-document-picker'
import { connect } from 'react-redux'
import { concatFile } from '../redux/actions/files'
import { setButtonLoading } from '../redux/actions/buttonLoading'
import { FileItem } from './components'

const mapStateToProps = ({ files, buttonLoading, session }) => ({
    files,
    buttonLoading,
    session
})

const mapDispatchToProps = dispatch => ({
    concatFile: (session, file) => dispatch(concatFile(session, file)),
    setButtonLoading: loading => dispatch(setButtonLoading(loading))
})

const FilesScreen = ({ files, concatFile, buttonLoading, setButtonLoading, session: { userId, accessToken } }) => {
    const _pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({})
        
        if (result.type === 'cancel') return

        concatFile({ accessToken, userId }, {
            uri: result.uri,
            type: '*/*',
            name: result.name
        })
    }
    
    return (
        <View style={styles.wrapper}>

            <View style={styles.containerHeader}>
                <Text h3>Your Files</Text>
            </View>
           
            <View style={styles.topContainer}>
                {files.map(file => (
                    <FileItem key={file.name} fileName={file.name} />
                ))}
                <Button
                    title="Add file"
                    type="clear" 
                    loading={buttonLoading}
                    onPress={_pickDocument}
                />
            </View>
            
        </View>
    )
}

FilesScreen.navigationOptions = {
    tabBarIcon: () => (
        <Icon type="antdesign" name="folder1" size={20} />
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilesScreen)