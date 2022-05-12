import {getUserInfo, login, logout} from '../../api/user'

const state = {
    hasLogin: false,
    nickname: '',
    avatar: '',
    balance: 0,
    memberId: ''
}

const mutations = {
    SET_HAS_LOGIN: (state, hasLogin) => {
        state.hasLogin = hasLogin
    },
    SET_NICKNAME: (state, nickname) => {
        state.nickname = nickname
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_BALANCE: (state, balance) => {
        state.balance = balance
    },
    SET_MEMBERID: (state, memberId) => {
        state.memberId = memberId
    }
}

const actions = {
    login({commit}, data) {
        return new Promise((resolve, reject) => {
            login(data).then(response => {

                console.log('response:', response)

                const {access_token, token_type} = response

                const token = token_type + " " + access_token

                uni.setStorageSync('token', token)
                commit('SET_HAS_LOGIN', true)

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getUserInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getUserInfo().then(response => {

                console.log('userInfo:',response)

                const data = response.data
                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                commit('SET_NICKNAME', data.sysUser.username)
                commit('SET_AVATAR', data.sysUser.avatar)
                commit('SET_BALANCE', 99999)
                commit('SET_MEMBERID', data.sysUser.userId)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({commit, state,}) {
        return new Promise((resolve) => {
            logout(state.token).then(() => {
                resolve()
            }).catch(() => {
                resolve()
            }).finally(() => {
                uni.removeStorage({
                    key: 'userInfo'
                })
                uni.removeStorage({
                    key: 'token'
                })
                commit('SET_HAS_LOGIN', false)
                commit('SET_NICKNAME', '')
                commit('SET_AVATAR', '')
                commit('SET_BALANCE', '')
                commit('SET_MEMBERID', '')
                resolve()
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
