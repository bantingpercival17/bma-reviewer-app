import {
    GET_USER_IMAGE,
    GET_USER_TOKEN,
    GET_USER_NAME,
    GET_USER_TYPE,
    IS_USER_AUTHENTICATE_GETTER
} from '@/store/storeConstants'

export default {
    [GET_USER_IMAGE]: (state) => {
        return state.image
    },
    [GET_USER_TOKEN]: (state) => {
        return state.token
    },
    [IS_USER_AUTHENTICATE_GETTER]: (state) => {
        return !!state.token
    },
    [GET_USER_NAME]: (state) => {
        return state.name
    },
    [GET_USER_NAME]: (state) => {
        return state.name
    },
    [GET_USER_TYPE]: (state) => {
        return state.userType
    }
}