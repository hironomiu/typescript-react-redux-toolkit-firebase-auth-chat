import reducer, {
  InitialState,
  setUser,
  signIn,
} from '../features/auth/authSlice'

describe('authSlice', () => {
  describe('setUser', () => {
    const initialState: InitialState = {
      isAuthentication: false,
      authenticationStatus: 'idle',
      email: '',
      displayName: '',
      uid: '',
      photoURL: '',
    }

    it('test', () => {
      const action = {
        type: setUser.type,
        payload: {
          uid: 'dummy',
          displayName: 'dummy displayName',
          photoURL: 'dummy url',
          email: 'dummy@dummy.dummy',
        },
      }
      const state = reducer(initialState, action)
      expect(state.uid).toEqual('dummy')
      expect(state.displayName).toEqual('dummy displayName')
      expect(state.photoURL).toEqual('dummy url')
      expect(state.email).toEqual('dummy@dummy.dummy')
    })
  })
  describe('signIn', () => {
    const initialState: InitialState = {
      isAuthentication: false,
      authenticationStatus: 'idle',
      email: '',
      displayName: '',
      uid: '',
      photoURL: '',
    }
    it('test', () => {
      const action = {
        type: signIn,
        payload: {
          isAuthentication: true,
        },
      }
      const state = reducer(initialState, action)
      expect(state.isAuthentication).toEqual(true)
    })
  })
})
