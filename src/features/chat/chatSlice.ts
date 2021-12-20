import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { messagesRef } from '../../firebase'

type InitialState = {
  message: { name: string; text: string }
  messages: Array<{ key: string; name: string; text: string }>
  readMessagesStatus: 'idle' | 'loading'
}
const initialState: InitialState = {
  message: { name: '', text: '' },
  messages: Array({ key: '', name: '', text: '' }),
  readMessagesStatus: 'idle',
}

export const readMessages = () => (dispatch: any) => {
  messagesRef.on('value', (snapshot) => {
    const messages = snapshot.val()
    if (!messages) {
      return
    }
    console.log('next')
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
      console.log(action.payload)
      state.readMessagesStatus = action.payload
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(readMessages.pending, (state) => {
    //     state.readMessagesStatus = 'loading'
    //   })
    //   .addCase(readMessages.fulfilled, (state) => {
    //     state.readMessagesStatus = 'idle'
    //   })
  },
})

export const selectMessage = (state: RootState) => state.chat.message
export const selectMessages = (state: RootState) => state.chat.messages
export const selectReadMessagesStatus = (state: RootState) =>
  state.chat.readMessagesStatus
export const { setName, setText, setMessages, setReadMessageStatus } =
  chatSlice.actions
export default chatSlice.reducer
