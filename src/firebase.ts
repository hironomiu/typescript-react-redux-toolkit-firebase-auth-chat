import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DATABASE_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_MEASUREMENT_ID,
} = process.env

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID,
}

firebase.initializeApp(firebaseConfig)

// Authentication

export type GithubProvider = firebase.auth.GithubAuthProvider

export const githubProvider: firebase.auth.GithubAuthProvider =
  new firebase.auth.GithubAuthProvider()

export const auth = firebase.auth()

export const socialMediaAuth = async (
  provider: firebase.auth.GithubAuthProvider
) => {
  try {
    const auth = firebase.auth()
    const data = auth.signInWithPopup(provider)
    return data.then((res) => res.user)
  } catch (err) {
    console.log(err)
  }
}

// Realtime Database
export const database = firebase.database()

// Realtime Database users

type PostUser = {
  name: string
  uid: string
  email: string
  photoURL: string
}

export const pushUser = ({ name, uid, email, photoURL }: PostUser) => {
  const usersRef = database.ref('users/' + uid)
  usersRef.on('value', (snapshot) => {
    const user = snapshot.val()
    if (!user) {
      usersRef.push({
        name,
        uid,
        email,
        photoURL,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      })
    }
  })
}

// Realtime Database messages

export const messagesRef = database.ref('message')

type Message = {
  name: string
  text: string
  uid: string
}
export const pushMessage = ({ name, text, uid }: Message) => {
  const createdAt = new Date()
  console.log(createdAt)
  messagesRef.push({
    name,
    text,
    uid,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  })
  // messagesRef.push({ name: 'hironomiu', text: 'hoge' })
}

// Storage

const storage = firebase.storage()
export const storageRef = storage.ref()
