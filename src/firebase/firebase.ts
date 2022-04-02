import 'firebase/compat/database'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

import { GithubAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  serverTimestamp,
} from 'firebase/database'
import { getStorage, ref as sRef } from 'firebase/storage'
import { firebaseApp } from './initializeApp'

// Authentication

export type GithubProvider = GithubAuthProvider

export const githubProvider: GithubAuthProvider = new GithubAuthProvider()

export const auth = getAuth(firebaseApp)

export const socialMediaAuth = async (provider: GithubAuthProvider) => {
  try {
    const auth = getAuth(firebaseApp)
    const data = await signInWithPopup(auth, provider)
    // return data.then((res) => res.user)
    return data.user
  } catch (err) {
    console.log(err)
  }
}

// Realtime Database
export const database = getDatabase(firebaseApp)

// Realtime Database users

type PostUser = {
  name: string
  uid: string
  email: string
  photoURL: string
}

export const pushUser = ({ name, uid, email, photoURL }: PostUser) => {
  const usersRef = ref(database, 'users/' + uid)
  onValue(usersRef, (snapshot) => {
    const user = snapshot.val()
    if (!user) {
      set(ref(database, 'users/' + uid), {
        name,
        uid,
        email,
        photoURL,
        createdAt: serverTimestamp(),
      })
    }
  })
}

export const getUserRef = (uid: string) => {
  return ref(database, 'users/' + uid)
}
// Realtime Database messages

export const messagesRef = ref(database, 'messages')

type Message = {
  name: string
  text: string
  uid: string
}
export const pushMessage = ({ name, text, uid }: Message) => {
  push(ref(database, 'messages'), {
    name,
    text,
    uid,
    createdAt: serverTimestamp(),
  })
}

// Storage

export const storage = getStorage(firebaseApp)
export const storageRef = sRef(storage)
