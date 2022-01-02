import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { database } from '../../firebase'
import { Dispatch } from 'redux'

type InitialState = {
  user: { uid: string; name: string; photoURL: string; email: string }
}

const initialState: InitialState = {
  user: { uid: '', name: '', photoURL: '', email: '' },
}

export const getFirebaseUser =
  (uid: string) => (dispath: Dispatch, getState: any) => {
    console.log(uid)
    const userRef = database.ref('users/' + uid)
    userRef.on('value', (snapshot) => {
      const user = snapshot.val()
      if (!user) {
        console.log('error')
      } else {
        console.log('user:', user)
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
        console.log('data:', data[0].name)
        dispath(setUser(data))
      }
    })
  }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.name = action.payload[0].name
      state.user.uid = action.payload[0].uid
      state.user.photoURL = action.payload[0].photoURL
      state.user.email = action.payload[0].email
    },
  },
})

export const selectUser = (state: RootState) => state.user.user
export const { setUser } = userSlice.actions
export default userSlice.reducer
