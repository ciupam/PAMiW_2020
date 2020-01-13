import React, { useEffect, useState, useRef } from 'react'
import { View } from 'react-native'
import { Text, Icon, Button } from 'react-native-elements'
import styles from '../assets/styles'
import { connect } from 'react-redux'
import { addFiles } from '../redux/actions/files'
import { getPublicPosts, getUserPosts, deleteUserPost } from '../redux/actions/posts'
import { NewPostOverlay, PostItem } from './components'

const mapStateToProps = ({ session, files, userPosts, publicPosts }) => ({
    session,
    files,
    userPosts,
    publicPosts
})

const mapDispatchToProps = dispatch => ({
    addFiles: session => dispatch(addFiles(session)),
    getPublicPosts: () => dispatch(getPublicPosts()),
    getUserPosts: session => dispatch(getUserPosts(session))
})

const HomeScreen = ({ 
    addFiles, 
    session: { userId, accessToken }, 
    getPublicPosts, 
    getUserPosts, 
    files, 
    userPosts, 
    publicPosts
}) => {
    const [isVisible, setIsVisible] = useState(false)


    useEffect(() => {
        if (files.length === 0) addFiles({ accessToken, userId })
        if (userPosts.length === 0) getUserPosts({ userId, accessToken })
        if (publicPosts.length === 0) getPublicPosts()
    }, [])

    const prevUserPosts = useRef(userPosts)

    useEffect(() => {
        if (prevUserPosts.current && prevUserPosts.current !== userPosts) {
            setIsVisible(false)
            getPublicPosts()
            prevUserPosts.current = userPosts
        }
    }, [userPosts])

    return (
        <View style={styles.wrapper}>
            <NewPostOverlay isVisible={isVisible} setIsVisible={setIsVisible} />

            <View style={styles.containerHeader}>
                <Text h3>Your Posts</Text>
            </View>

            <View style={styles.topContainer}>
                {userPosts.map(post => (
                    <PostItem 
                        key={post._id} 
                        post={post} 
                        userPost
                    />
                ))}
                <Button
                    title="Add post"
                    type="clear"
                    onPress={() => setIsVisible(true)}
                />
            </View>

            <View style={styles.containerHeader}>
                <Text h3>Public Posts</Text>
            </View>

            <View style={styles.topContainer}>
                {publicPosts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </View>

        </View>
    )
}

HomeScreen.navigationOptions = {
    tabBarIcon: () => (
        <Icon type="antdesign" name="home" size={20} />
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen)