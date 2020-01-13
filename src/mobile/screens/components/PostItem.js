import React from 'react'
import { ListItem } from 'react-native-elements'
import styles from '../../assets/styles'
import { connect } from 'react-redux'
import { deleteUserPost } from '../../redux/actions/posts'

const mapDispatchToProps = dispatch => ({
    deleteUserPost: (postId, accessToken) => dispatch(deleteUserPost(postId, accessToken))
})

const mapStateToProps = ({ session }) => ({
    session
})

const PostItem = ({ 
    post: { title, firstname, lastname, date, _id }, 
    userPost,
    session: { accessToken },
    deleteUserPost
}) => (
    <ListItem 
        title={title}
        subtitle={`${firstname} ${lastname} / ${date}`}
        bottomDivider
        containerStyle={styles.fileItem}
        rightIcon={userPost ? { 
            type: 'material', 
            name: 'clear', 
            color: 'red', 
            onPress: () => deleteUserPost(_id, accessToken)
        } : null}
    />
)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostItem)