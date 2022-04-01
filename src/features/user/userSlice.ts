import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { database, getUserRef } from '../../firebase/firebase'
import { onValue, set, ref } from 'firebase/database'
import { Dispatch } from 'redux'

export type InitialState = {
  user: {
    uid: string
    name: string
    photoURL: string
    email: string
    createdAt: number
  }
}

const initialState: InitialState = {
  user: { uid: '', name: '', photoURL: '', email: '', createdAt: 0 },
}

export const getFirebaseUser =
  (uid: string) => (dispath: Dispatch, getState: any) => {
    const userRef = getUserRef(uid)
    onValue(userRef, (snapshot) => {
      const user = snapshot.val()
      if (!user) {
        console.log('error')
      } else {
        dispath(setUser({ key: uid, ...user }))
      }
    })
  }

export const updateFirebaseUser =
  (uid: string, url: string) => (dispatch: Dispatch, getState: any) => {
    const state = selectUser(getState())

    set(ref(database, 'users/' + uid), {
      uid: state.uid,
      name: state.name,
      email: state.email,
      createdAt: state.createdAt,
      photoURL: url,
    })
    dispatch(setPhotoURL(url))
  }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.name = action.payload.name
      state.user.uid = action.payload.uid
      state.user.photoURL = action.payload.photoURL
      state.user.email = action.payload.email
      state.user.createdAt = action.payload.createdAt
    },
    setPhotoURL: (state, action) => {
      state.user.photoURL = action.payload
    },
  },
})

export const selectUser = (state: RootState) => state.user.user
export const { setUser, setPhotoURL } = userSlice.actions
export default userSlice.reducer
