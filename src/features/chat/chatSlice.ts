import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { messagesRef } from '../../firebase/firebase'
import { onValue } from 'firebase/database'
import { Dispatch } from 'redux'

type SendMessage = {
  uid: string
  name: string
  text: string
  photoURL: string
}

type Message = {
  name: string
  text: string
  uid: string
  photoURL: string
  createdAt: number
}
export type InitialState = {
  sendMessage: SendMessage
  messages: Array<Message & { key: string }>
}

const initialState: InitialState = {
  sendMessage: { uid: '', name: '', text: '', photoURL: '' },
  messages: [
    { key: '', name: '', text: '', uid: '', photoURL: '', createdAt: 0 },
  ],
}

export const readMessages = () => (dispatch: Dispatch) => {
  onValue(messagesRef, (snapshot) => {
    const messages = snapshot.val()
    if (!messages) return

    const entries: Array<[string, Message]> = Object.entries(messages)
    const newMessages: Array<Message & { key: string }> = entries.map(
      (data) => {
        const [key, message] = data
        return { key, ...message }
      }
    )
    dispatch(setMessages(newMessages))
  })

  return
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUid: (state, action) => {
      state.sendMessage.uid = action.payload
    },
    setName: (state, action) => {
      state.sendMessage.name = action.payload
    },
    setText: (state, action) => {
      state.sendMessage.text = action.payload
    },
    setPhotoURL: (state, action) => {
      state.sendMessage.photoURL = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(readMessages.pending, (state) => {
    //     console.log('pending')
    //     state.readMessagesStatus = 'loading'
    //   })
    //   .addCase(readMessages.fulfilled, (state, action) => {
    //     console.log('fulfilled')
    //     state.readMessagesStatus = 'idle'
    //   })
  },
})

export const selectSendMessage = (state: RootState) => state.chat.sendMessage
export const selectMessages = (state: RootState) => state.chat.messages

export const { setUid, setName, setText, setPhotoURL, setMessages } =
  chatSlice.actions
export default chatSlice.reducer
