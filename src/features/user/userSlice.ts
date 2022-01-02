import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { database } from '../../firebase'

type InitialState = {
  uid: string
  name: string
  photoURL: string
  email: string
}

const initialState: InitialState = {
  uid: '',
  name: '',
  photoURL: '',
  email: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action)
      const userRef = database.ref('users/' + action.payload)
      userRef.on('value', (snapshot) => {
        const user = snapshot.val()
        if (!user) {
          console.log('error')
        } else {
          console.log('user:', user)
          const entries: any = Object.entries(user)
          const data = entries.map((data: any) => {
            const [key, user] = data
            return { key, ...user }
          })
          console.log('data:', data[0].name)
          state.name = data[0].name
          state.uid = data[0].uid
          state.photoURL = data[0].photoURL
          state.email = data[0].email
        }
      })
    },
  },
})

export const selectUserName = (state: RootState) => state.user.name
export const selectUserEmail = (state: RootState) => state.user.email
export const selectUserUid = (state: RootState) => state.user.uid
export const selectUserPhotoURL = (state: RootState) => state.user.photoURL
export const { setUser } = userSlice.actions
export default userSlice.reducer
