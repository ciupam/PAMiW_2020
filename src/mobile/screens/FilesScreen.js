import React from 'react'
import { View } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import styles from '../assets/styles'
import * as DocumentPicker from 'expo-document-picker'

const FilesScreen = ({ navigation: { navigate } }) => {
    const _pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
		alert(result.uri);
        console.log(result);
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.absoluteButtonContainer}>
                <Icon
                    reverse
                    type="antdesign"
                    name="plus"
                    color="blue"
                    onPress={_pickDocument}
                />
            </View>
            <Text h3>Files Screen</Text>
        </View>
    )
}

FilesScreen.navigationOptions = () => ({
    tabBarIcon: () => (
        <Icon type="antdesign" name="folder1" size={20} />
    )
})

export default FilesScreen