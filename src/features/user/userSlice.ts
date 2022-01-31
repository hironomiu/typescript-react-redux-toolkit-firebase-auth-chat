import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { database, getUserRef } from '../../firebase/firebase'
import { onValue, set, ref } from 'firebase/database'
import { Dispatch } from 'redux'

type InitialState = {
  user: {
    key: string
    uid: string
    name: string
    photoURL: string
    email: string
  }
}

const initialState: InitialState = {
  user: { key: '', uid: '', name: '', photoURL: '', email: '' },
}

export const getFirebaseUser =
  (uid: string) => (dispath: Dispatch, getState: any) => {
    const userRef = getUserRef(uid)
    onValue(userRef, (snapshot) => {
      const user = snapshot.val()
      if (!user) {
        console.log('error')
      } else {
        const entries: any = Object.entries(user)

        type Data = {
          key: string
          name: string
          uid: string
          photoURL: string
          email: string
        }
        const data: Array<Data> = entries.map((data: any) => {
          const [key, user] = data
          return { key, ...user }
        })
        dispath(setUser(data))
      }
    })
  }

export const updateFirebaseUser =
  (uid: string, url: string) => (dispatch: Dispatch, getState: any) => {
    const state = selectUser(getState())
    // const userRef = getUserRef(uid + '/' + state.key)
    set(ref(database, 'users/' + uid + '/' + state.key), {
      photoURL: url,
    })

    dispatch(setPhotoURL(url))
  }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.key = action.payload[0].key
      state.user.name = action.payload[0].name
      state.user.uid = action.payload[0].uid
      state.user.photoURL = action.payload[0].photoURL
      state.user.email = action.payload[0].email
    },
    setPhotoURL: (state, action) => {
      state.user.photoURL = action.payload
    },
  },
})

export const selectUser = (state: RootState) => state.user.user
export const { setUser, setPhotoURL } = userSlice.actions
export default userSlice.reducer
