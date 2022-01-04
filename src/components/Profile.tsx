import React, { FC, memo, useState } from 'react'
import { storageRef } from '../firebase'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, updateFirebaseUser } from '../features/user/userSlice'
import { MessageModal } from './'

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

  return (
    <div className="flex flex-col items-center ">
      {modalOn ? (
        <MessageModal
          message="アバター画像を登録しました"
          setModalOn={setModalOn}
        />
      ) : null}
      <div className="fixed top-20 ">
        <h1 className=" text-xl">{user.name}'s Profile</h1>
      </div>
      <span>email:{user.email}</span>

      <div className="flex -space-x-2 overflow-hidden flex-col px-4">
        {user.photoURL ? (
          <img
            className="inline-block h-14 w-14 rounded-full ring-2 ring-white"
            src={user.photoURL}
            alt=""
          />
        ) : (
          'no photo image'
        )}
      </div>
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
          <button
            onClick={async () => {
              const ref = storageRef
                .child('images/' + user.uid + '_avatar')
                .put(image)
              const url = await ref.snapshot.ref.getDownloadURL()
              setModalOn(true)
              setPreview('')
              setImage('')
              setKey((key) => key + 1)
              setIsEntry((isEntry) => !isEntry)
              dispatch(updateFirebaseUser(user.uid, url))
            }}
          >
            アップロード
          </button>
        </>
      ) : (
        <span onClick={() => setIsEntry((isEntry) => !isEntry)}>
          アバター画像を登録する
        </span>
      )}
    </div>
  )
})
