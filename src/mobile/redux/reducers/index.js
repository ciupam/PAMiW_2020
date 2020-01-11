import { combineReducers } from 'redux'
import files from './files'
import session from './session'
import buttonLoading from './buttonLoading'
import errors from './errors'

export default combineReducers({ files, buttonLoading, session, errors })