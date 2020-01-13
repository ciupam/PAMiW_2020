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
