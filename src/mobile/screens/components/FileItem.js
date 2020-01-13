import React from 'react'
import { ListItem } from 'react-native-elements'
import styles from '../../assets/styles'

export default ({ fileName }) => (
    <ListItem 
        title={fileName}
        bottomDivider
        containerStyle={styles.fileItem}
    />
)