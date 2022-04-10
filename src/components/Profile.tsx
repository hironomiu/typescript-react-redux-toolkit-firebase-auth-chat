import React, { FC, memo, useState } from 'react'
import { storage } from '../firebase/firebase'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, updateFirebaseUser } from '../features/user/userSlice'
import { MessageModal } from './'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const Profile: FC = memo(() => {
  const [preview, setPreview] = useState('')
  const [image, setImage] = useState<any>()
  const [key, setKey] = useState(1)
  const [isEntry, setIsEntry] = useState(false)
  const dispatch = useDispatch()
  const [modalOn, setModalOn] = useState(false)
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    if (files.length === 0) {
      setPreview('')
      setImage('')
      return
    }
    setPreview(window.URL.createObjectURL(files[0]))
    setImage(files.item(0))
  }
  const user = useSelector(selectUser)

  const handleClick = async () => {
    console.log(user)
    const sRef = ref(storage, 'images/' + user.uid + '_avatar')
    console.log('called')
    uploadBytes(sRef, image)
      .then((snapshot) => {
        console.log('ok')
      })
      .catch((err) => console.log(err))
    getDownloadURL(ref(storage, 'images/' + user.uid + '_avatar')).then(
      (url) => {
        dispatch(updateFirebaseUser(user.uid, url))
      }
    )

    // const url = await res(snapshot => snapshot.ref.getDownloadURL())
    setModalOn(true)
    setPreview('')
    setImage('')
    setKey((key) => key + 1)
    setIsEntry((isEntry) => !isEntry)
    // dispatch(updateFirebaseUser(user.uid, url))
  }

  return (
    <div className="flex flex-col items-center ">
      <div className="fixed top-20 ">
        <h1 className=" text-xl">{user.name}'s Profile</h1>
      </div>
      <span className="my-4">email:{user.email}</span>

      <div className="flex -space-x-2 overflow-hidden flex-col px-4">
        {user.photoURL ? (
          <img
            className="inline-block h-14 w-14 rounded-full ring-2 ring-white"
            src={user.photoURL}
            data-testid="photo-img"
            alt=""
          />
        ) : (
          'no photo image'
        )}
      </div>
      {modalOn ? (
        <MessageModal
          message="アバター画像を登録しました"
          setModalOn={setModalOn}
        />
      ) : null}
      {/* keyを設定することでアップロード後に選択をクリアする */}
      {isEntry ? (
        <>
          <input
            key={key}
            type="file"
            name=""
            id=""
            onChange={handleChangeFile}
          />
          <div className="flex -space-x-2 overflow-hidden flex-col px-4">
            {preview ? (
              <img
                className="inline-block h-14 w-14 rounded-full ring-2 ring-white"
                src={preview}
                alt=""
              />
            ) : null}
          </div>
          <div className="my-4">
            <button
              className="mx-2 px-2 py-1 border-2 rounded hover:bg-black hover:text-white hover:font-bold"
              disabled={!preview ? true : false}
              onClick={handleClick}
              data-testid="upload-button"
            >
              アップロード
            </button>
            <button
              className="mx-2 px-2 py-1 border-2 rounded hover:bg-black hover:text-white hover:font-bold"
              onClick={() => {
                if (isEntry) setIsEntry((isEntry) => !isEntry)
              }}
              data-testid="close-button"
            >
              閉じる
            </button>
          </div>
        </>
      ) : (
        <span
          className="my-10 animate-bounce selection:my-2 px-2 py-1 border-2 hover:cursor-pointer hover:bg-black hover:text-white hover:font-bold"
          onClick={() => setIsEntry((isEntry) => !isEntry)}
          data-testid="avatar-registration"
        >
          アバター画像を登録する
        </span>
      )}
    </div>
  )
})
