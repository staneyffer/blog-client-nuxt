import cookie from 'cookie'
import {setAuthToken, resetAuthToken} from '../utils/auth'

import {GET_CATE_LIST} from './category'
import {GET_TAG_LIST} from './tag'
import {GET_SEC_LIST} from './section'
import {FETCH_USER, SET_TOKEN} from './user'

export const state = () => ({
  sidebar: false
})

export const actions = {
  /**
   * 仅仅是在服务器端被调用
   * @param store
   * @param context
   */
  nuxtServerInit (store, context) {
    const cookies = cookie.parse(context.req.headers.cookie || '')
    let userId = null
    // 已经登录
    if (cookies.hasOwnProperty('access-token')) {
      setAuthToken(cookies['access-token'])
      userId = cookies['user-id']
      store.commit('user/' + SET_TOKEN, {token: cookies['access-token'], isLogin: true})
    } else {
      resetAuthToken()
    }
    const initAppData = [
      store.dispatch('category/' + GET_CATE_LIST),
      store.dispatch('tag/' + GET_TAG_LIST),
      store.dispatch('section/' + GET_SEC_LIST),
      store.dispatch('user/' + FETCH_USER, userId)
    ]
    return Promise.all(initAppData)
  }
}
