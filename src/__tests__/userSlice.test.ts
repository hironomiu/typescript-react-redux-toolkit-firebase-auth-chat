import reducer, {
  InitialState,
  setUser,
  setPhotoURL,
} from '../features/user/userSlice'

describe('userSlice', () => {
  describe('setUser', () => {
    const initialState: InitialState = {
      user: {
        uid: '',
        name: '',
        photoURL: '',
        email: '',
        createdAt: 0,
      },
    }
    it('setUser', () => {
      const action = {
        type: setUser.type,
        payload: {
          uid: 'dummy',
          name: 'dummy name',
          photoURL: 'dummy url',
          email: 'dummy@dummy.dummy',
          createdAt: 0,
        },
      }
      const state = reducer(initialState, action)
      expect(state.user.uid).toEqual('dummy')
      expect(state.user.name).toEqual('dummy name')
      expect(state.user.photoURL).toEqual('dummy url')
      expect(state.user.email).toEqual('dummy@dummy.dummy')
    })
  })
  describe('setPhotoURL', () => {
    const initialState: InitialState = {
      user: {
        uid: '',
        name: '',
        photoURL: '',
        email: '',
        createdAt: 0,
      },
    }
    it('setPhotoURL', () => {
      const action = {
        type: setPhotoURL.type,
        payload: 'dummy url',
      }
      const state = reducer(initialState, action)
      expect(state.user.photoURL).toEqual('dummy url')
    })
  })
})
