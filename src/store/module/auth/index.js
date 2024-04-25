import {
    APPLICANT_LOGIN_ACTION,
    AUTH_ACTION,
    AUTO_LOGIN_ACTION,
    GET_USER_IMAGE,
    GET_USER_TOKEN,
    GET_USER_NAME,
    IS_USER_AUTHENTICATE_GETTER,
    LOGIN_ACTION,
    LOGOUT_ACTION,
    SET_USER_TOKEN_MUTATION,
    APPLICANT_REGISTRATION_ACTION,
    GET_USER_TYPE,
    GET_USER_ID
} from '@/store/storeConstants'
import axios from 'axios'
import LoginValidation from '@/services/validation/LoginValidation.js'
import User from '../../../database/UserModel'
export default {
    namespaced: true,
    state() {
        return {
            userId: '',
            name: '',
            email: '',
            token: '',
            userType: '',
            image: ''
        }
    },
    mutations: {
        [SET_USER_TOKEN_MUTATION](state, payload) {
            state.email = payload.email
            state.name = payload.name
            state.token = payload.token
            state.image = payload.image
            state.userId = payload.userId
            state.userType = payload.userType
        }
    },
    getters: {
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
        [GET_USER_TYPE]: (state) => {
            return state.userType
        },
        [GET_USER_ID]: (state) => {
            return state.userId
        }
    },
    actions: {
        [LOGOUT_ACTION](context) {
            const tokenData = {
                userId: null,
                email: null,
                name: null,
                token: null,
                image: null
            }
            context.commit(SET_USER_TOKEN_MUTATION, tokenData)
            localStorage.removeItem('userData')
        },

        async [LOGIN_ACTION](context, payload) {
            return context.dispatch(AUTH_ACTION, {
                ...payload,
                url: 'student/login',
                userType: 'student'
            })
        },
        async [APPLICANT_LOGIN_ACTION](context, payload) {
            return context.dispatch(AUTH_ACTION, {
                ...payload,
                url: 'applicant/login',
                userType: 'applicant'
            })
        },
        [AUTO_LOGIN_ACTION](context) {
            const userData = localStorage.getItem('userData')
            if (userData) {
                context.commit(SET_USER_TOKEN_MUTATION, JSON.parse(userData))
            }
        },

        async [AUTH_ACTION](context, payload) {
            let response = ''
            try {
                response = await axios.post(payload.url, {
                    email: payload.email,
                    password: payload.password,
                    app: true
                })
                if (response.status === 200) {
                    if (response.data) {
                        const userName = payload.userType === 'student' ? response.data.student.account.student.first_name : response.data.student.account.name
                        const tokenData = {
                            userId: response.data.student.account.student_id,
                            email: response.data.student.account.email,
                            name: userName,
                            userType: payload.userType,
                            token: response.data.token,
                            image: response.data.student.profile_picture
                        }
                        context.commit(SET_USER_TOKEN_MUTATION, tokenData)
                        localStorage.setItem('userData', JSON.stringify(tokenData))
                         const userModel = new User();
                         userModel.insertUser(response.data.student.account.student_id,
                             response.data.student.account.email, userName, response.data.token)
                        console.log('Save Detials')
                    } else {
                        throw 'No data'
                    }

                }
            } catch (error) {
                console.log(error)
                const errorMessage = LoginValidation.serverError(error.response)
                /* const errorMessage = 'Server Offline' */
                console.log(errorMessage)
                throw errorMessage
            }
        },
        async [APPLICANT_REGISTRATION_ACTION](context, payload) {
            let response = ''
            try {
                response = await axios.post('applicant/register', payload)
                if (response.status === 200) {
                    console.log('Registration Complete')
                    return response
                }
            } catch (error) {
                console.log('Auth Module ' + error)
                /* const errorMessage = LoginValidation.serverError(error.response)
                console.log(errorMessage)
                throw errorMessage */
                throw error
            }
        }
    }
}