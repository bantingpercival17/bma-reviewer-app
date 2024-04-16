import LoginValidation from '@/services/validation/LoginValidation'
import {
    LOGIN_ACTION,
    LOGOUT_ACTION,
    APPLICANT_LOGIN_ACTION,
    AUTO_LOGIN_ACTION,
    AUTH_ACTION,
    SET_USER_TOKEN_MUTATION,
    APPLICANT_REGISTRATION_ACTION
} from '@/store/storeConstants'
import axios from 'axios'
export default {
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
                    /*  const userModel = new User();
                     userModel.insertUser(response.data.student.account.student_id,
                         response.data.student.account.email, userName, response.data.token) */
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