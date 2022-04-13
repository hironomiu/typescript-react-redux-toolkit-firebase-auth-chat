import reducer, {
  InitialState,
  setUid,
  setName,
  setText,
  setMessages,
} from '../features/chat/chatSlice'
const initialState: InitialState = {
  sendMessage: {
    uid: '',
    name: '',
    text: '',
    photoURL: '',
  },
  messages: [
    {
      key: '',
      name: '',
      text: '',
      photoURL: '',
      createdAt: 0,
      uid: '',
    },
  ],
}
describe('chatSlice', () => {
  describe('setUid', () => {
    it('test', () => {
      const action = {
        type: setUid.type,
        payload: 'dummy uid',
      }
      const state = reducer(initialState, action)
      expect(state.sendMessage.uid).toEqual('dummy uid')
    })
  })
  describe('setName', () => {
    it('test', () => {
      const action = { type: setName.type, payload: 'dummy name' }
      const state = reducer(initialState, action)
      expect(state.sendMessage.name).toEqual('dummy name')
    })
  })
  describe('setText', () => {
    it('test', () => {
      const action = { type: setText, payload: 'dummy text' }
      const state = reducer(initialState, action)
      expect(state.sendMessage.text).toEqual('dummy text')
    })
  })
  describe('setMessages', () => {
    const action = {
      type: setMessages,
      payload: [
        {
          key: 'dummy key',
          name: 'dummy name',
          text: 'dummy text',
          createdAt: 1643665753272,
          uid: 'dummy uid',
        },
      ],
    }
    const state = reducer(initialState, action)
    expect(state.messages[0].key).toEqual('dummy key')
    expect(state.messages[0].name).toEqual('dummy name')
    expect(state.messages[0].text).toEqual('dummy text')
    expect(state.messages[0].createdAt).toEqual(1643665753272)
    expect(state.messages[0].uid).toEqual('dummy uid')
  })
})
