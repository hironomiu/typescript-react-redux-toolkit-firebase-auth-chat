import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import {
  socialMediaAuth,
  GithubProvider,
  auth,
  pushUser,
} from '../../firebase/firebase'

export type InitialState = {
  isAuthentication: boolean
  authenticationStatus: 'idle' | 'loading'
  email: string
  displayName: string
  uid: string
  photoURL: string
}

const initialState: InitialState = {
  isAuthentication: false,
  authenticationStatus: 'idle',
  // checkAuthenticationStatus: 'idle',
  email: '',
  displayName: '',
  uid: '',
  photoURL: '',
}

export const authentication = createAsyncThunk(
  'auth/authentication',
  async (provider: GithubProvider) => {
    const res = await socialMediaAuth(provider)
    console.log(res?.photoURL)
    if (res?.email && res?.displayName && res.uid && res.photoURL) {
      pushUser({
        email: res.email,
        name: res.displayName,
        uid: res.uid,
        photoURL: res?.photoURL,
      })
    }
    return {
      email: res?.email,
      displayName: res?.displayName,
      uid: res?.uid,
      photoURL: res?.photoURL,
    }
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
      state.photoURL = action.payload.photoURL
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
        if (
          action.payload.displayName &&
          action.payload.uid &&
          action.payload.email &&
          action.payload.photoURL
        ) {
          state.isAuthentication = true
          state.uid = action.payload.uid
          state.displayName = action.payload.displayName
          state.email = action.payload.email
          state.photoURL = action.payload.photoURL
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
    if (user?.email && user?.displayName && user.uid) {
      dispatch(
        setUser({
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
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
export const selectPhotoURL = (state: RootState) => state.auth.photoURL
export default authSlice.reducer
