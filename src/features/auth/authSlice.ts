import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { socialMediaAuth, GithubProvider, auth } from '../../firebase'

const initialState = {
  isAuthentication: false,
  authenticationStatus: 'idle',
  // checkAuthenticationStatus: 'idle',
  email: '',
  displayName: '',
  uid: '',
}

export const authentication = createAsyncThunk(
  'auth/authentication',
  async (provider: GithubProvider) => {
    const res = await socialMediaAuth(provider)
    return { email: res?.email, displayName: res?.displayName, uid: res?.uid }
  }
)

export const signOut = createAsyncThunk('auth/signOut', async () => {
  auth.signOut()
  return true
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email
      state.displayName = action.payload.displayName
      state.uid = action.payload.uid
    },
    signIn: (state) => {
      state.isAuthentication = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authentication.pending, (state) => {
        state.authenticationStatus = 'loading'
      })
      .addCase(authentication.fulfilled, (state, action) => {
        if (action.payload?.displayName) {
          state.isAuthentication = true
        }
        state.authenticationStatus = 'idle'
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isAuthentication = false
      })
  },
})

export const checkAuthentication = () => (dispatch: any) => {
  auth.onAuthStateChanged((user) => {
    if (user?.email && user?.displayName) {
      dispatch(
        setUser({
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
        })
      )
      dispatch(signIn())
    }
  })
}

export const { setUser, signIn } = authSlice.actions

export const selectAuthenticationStatus = (state: RootState) =>
  state.auth.authenticationStatus
// export const selectCheckAuthentication = (state: RootState) =>
// state.auth.checkAuthenticationStatus
export const selectIsAuthentication = (state: RootState) =>
  state.auth.isAuthentication
export const selectUid = (state: RootState) => state.auth.uid
export const selectDisplayName = (state: RootState) => state.auth.displayName
export default authSlice.reducer
