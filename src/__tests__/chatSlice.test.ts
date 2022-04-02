import reducer, {
  InitialState,
  setUid,
  setName,
  setText,
  setMessages,
  setReadMessageStatus,
} from '../features/chat/chatSlice'

describe('chatSlice', () => {
  describe('setUid', () => {
    const initialState: InitialState = {
      sendMessage: {
        uid: '',
        name: '',
        text: '',
      },
      messages: [
        {
          key: '',
          name: '',
          text: '',
          createdAt: 0,
          uid: '',
        },
      ],
      readMessagesStatus: 'idle',
    }
    it('test', () => {
      const action = {
        type: setUid.type,
        payload: 'dummy uid',
      }
      const state = reducer(initialState, action)
      expect(state.sendMessage.uid).toEqual('dummy uid')
    })
  })
})
