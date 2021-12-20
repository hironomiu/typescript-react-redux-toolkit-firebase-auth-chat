import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { socialMediaAuth, GithubProvider, auth } from '../../firebase'

const initialState = {
  isAuthentication: false,
  authenticationStatus: 'idle',
  email: '',
  displayName: '',
}

export const authentication = createAsyncThunk(
  'auth/authentication',
  async (provider: GithubProvider) => {
    const res = await socialMediaAuth(provider)
    return { email: res?.email, displayName: res?.displayName }
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
      console.log(action.payload.email)
      state.email = action.payload.email
      state.displayName = action.payload.displayName
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
      dispatch(setUser({ email: user.email, displayName: user.displayName }))
      dispatch(signIn())
    }
  })
}

export const { setUser, signIn } = authSlice.actions

export const selectIsAuthentication = (state: RootState) =>
  state.auth.isAuthentication
export const selectDisplayName = (state: RootState) => state.auth.displayName
export default authSlice.reducer
