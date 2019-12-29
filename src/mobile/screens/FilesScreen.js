import React, { useState, useEffect } from 'react'
import { View, AsyncStorage } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import styles from '../assets/styles'
import * as DocumentPicker from 'expo-document-picker'

const FilesScreen = ({ navigation: { navigate } }) => {
    const [files, setFiles] = useState([])
    const [accessToken, setAccessToken] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken')
                setAccessToken(token)
                const id = await AsyncStorage.getItem('userId')
                setUserId(id)
                const response = await fetch(`https://pamw-appp.herokuapp.com/app/user/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                })
                const data = await response.json()
                console.log(data)
                setFiles(data)
            } catch(err) {
                console.log(err);
            }
        })()
    }, [])

    const _pickDocument = async () => {
	    const result = await DocumentPicker.getDocumentAsync({})
		alert(result.uri)
        console.log(result)

        if (result.type === 'cancel') return

        const formData = new FormData()
        formData.append('file', {
            uri: result.uri,
            type: '*/*',
            name: result.name
        })

        if (files.filter(file => file.name === data.name).length === 0) setFiles(prev => prev.concat(data))

        try {
            const response = await fetch(`https://pamw-appp.herokuapp.com/app/user/${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json'
                },
                body: formData
            })
            const data = await response.json()
            console.log(data)
        } catch(err) {
            console.log(err)
        }
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
            {files.map(file => (
                <Text>{file.name}</Text>
            ))}
        </View>
    )
}

FilesScreen.navigationOptions = () => ({
    tabBarIcon: () => (
        <Icon type="antdesign" name="folder1" size={20} />
    )
})

export default FilesScreen