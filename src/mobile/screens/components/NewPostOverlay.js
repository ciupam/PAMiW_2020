import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { 
    Overlay, 
    Text, 
    Button, 
    Input, 
    CheckBox, 
    Icon 
} from 'react-native-elements'
import styles from '../../assets/styles'
import { connect } from 'react-redux'
import { addUserPost } from '../../redux/actions/posts'

const mapDispatchToProps = dispatch => ({
    addUserPost: (post, accessToken) => dispatch(addUserPost(post, accessToken))
})

const mapStateToProps = ({ buttonLoading, session }) => ({
    buttonLoading,
    session
})

const PostOverlay = ({ 
    isVisible, 
    setIsVisible, 
    addUserPost, 
    buttonLoading, 
    session: { 
        firstname,
        lastname,
        accessToken
    } 
}) => {
    const [title, setTitle] = useState('')
    const [_public, setPublic] = useState(false)

    const addPostCallback = useCallback(() => {
        addUserPost({
            firstname,
            lastname,
            title,
            _public
        }, accessToken)
    }, [accessToken, title, _public])

    return (
        <Overlay isVisible={isVisible}>
            <View style={styles.container}>
                <Icon
                    containerStyle={styles.absoluteLeftTop}
                    type="material"
                    name="arrow-back"
                    onPress={() => setIsVisible(false)}
                />
                <View style={styles.containerHeader}>
                    <Text h4>Add new post</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Input 
                        placeholder="post title"
                        label="Title"
                        leftIcon={{ type: 'antdesign', name: 'tago' }}
                        leftIconContainerStyle={styles.leftIconContainer}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <CheckBox
                        center
                        title="Public"
                        checked={_public}
                        onPress={() => setPublic(prev => !prev)}
                        checkedIcon="check"
                        uncheckedIcon="add"
                        iconType="material"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Add"
                        onPress={addPostCallback}
                        loading={buttonLoading}
                    />
                </View>
            </View>
        </Overlay>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostOverlay)