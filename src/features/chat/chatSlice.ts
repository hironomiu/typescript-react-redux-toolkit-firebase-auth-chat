import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { messagesRef, storage } from '../../firebase/firebase'
import { onValue } from 'firebase/database'
import { Dispatch } from 'redux'
// TODO: 直接呼ばない
import { ref, getDownloadURL } from 'firebase/storage'

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
  defaultAvatarURL: string
}

const initialState: InitialState = {
  sendMessage: { uid: '', name: '', text: '', photoURL: '' },
  messages: [
    { key: '', name: '', text: '', uid: '', photoURL: '', createdAt: 0 },
  ],
  // TODO: chat? user?
  defaultAvatarURL: '',
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

export const getDefaultAvatarURL = () => (dispatch: Dispatch) => {
  getDownloadURL(ref(storage, 'images/default_avatar.png')).then((url) => {
    dispatch(setDefaultAvatarURL(url))
  })
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
    // TODO: chat? user?
    setDefaultAvatarURL: (state, action) => {
      state.defaultAvatarURL = action.payload
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
export const selectDefaultAvatarURL = (state: RootState) =>
  state.chat.defaultAvatarURL
export const {
  setUid,
  setName,
  setText,
  setPhotoURL,
  setMessages,
  setDefaultAvatarURL,
} = chatSlice.actions
export default chatSlice.reducer
