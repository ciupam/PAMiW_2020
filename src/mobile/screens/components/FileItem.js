import React from 'react'
import { View, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import styles from '../../assets/styles'

export default ({ fileName }) => (
    <ListItem 
        title={fileName}
        bottomDivider
        containerStyle={styles.fileItem}
        checkmark
    />
)