import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { messagesRef } from '../../firebase/firebase'
import { onValue } from 'firebase/database'
import { Dispatch } from 'redux'

type InitialState = {
  message: { uid: string; name: string; text: string }
  messages: Array<{
    key: string
    name: string
    text: string
    createdAt: string
  }>
  readMessagesStatus: 'idle' | 'loading'
}

const initialState: InitialState = {
  message: { uid: '', name: '', text: '' },
  messages: [{ key: '', name: '', text: '', createdAt: '' }],
  readMessagesStatus: 'idle',
}

export const readMessages = () => (dispatch: Dispatch, getState: any) => {
  onValue(messagesRef, (snapshot) => {
    const messages = snapshot.val()
    if (!messages) {
      return
    }
    type Message = {
      name: string
      text: string
    }
    const entries: Array<[string, Message]> = Object.entries(messages)
    type NewMessage = {
      key: string
      name: string
      text: string
    }
    const newMessages: Array<NewMessage> = entries.map((data) => {
      const [key, message] = data
      return { key, ...message }
    })
    dispatch(setMessages(newMessages))
  })

  return
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUid: (state, action) => {
      state.message.uid = action.payload
    },
    setName: (state, action) => {
      state.message.name = action.payload
    },
    setText: (state, action) => {
      state.message.text = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    setReadMessageStatus: (state, action) => {
      state.readMessagesStatus = action.payload
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

export const selectMessage = (state: RootState) => state.chat.message
export const selectMessages = (state: RootState) => state.chat.messages
export const selectReadMessagesStatus = (state: RootState) =>
  state.chat.readMessagesStatus
export const { setUid, setName, setText, setMessages, setReadMessageStatus } =
  chatSlice.actions
export default chatSlice.reducer
