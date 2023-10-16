import { IUser, IUserResponse } from '../../api/types';
import { FormSchemaType } from '../../../components/loginForm/LoginForm'
import { logOut, setCredentials } from './authSlice';
import { apiSlice } from '../../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<IUser, FormSchemaType>({
      query: credentials => ({
        url: '/user/authenticate-user',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/user/user-log-out',
        method: 'POST',
      }),
      //we verify that query has fullfilled
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          //console.log("logout data: ", data)
          //sets token to null in local state
          dispatch(logOut())
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState())
          }, 1000)
        } catch (err) {
          console.log(err)
        }
      }
    }),
    refresh: builder.mutation<any, void>({
      query: () => ({
        url: '/user/refresh-token',
        method: 'GET'
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          //console.log("accessToken from refresh endpoint ", data)
          const { accessToken } = data
          dispatch(setCredentials({ accessToken }))
        } catch (err) {
          console.log(err)
        }
      }
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/user/create-user',
        method: 'POST',
        body: { ...userData }
      })
    }),
  }),
})

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
  useRegisterMutation
} = authApiSlice 