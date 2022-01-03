import React, { FC, memo, useState } from 'react'
import { storageRef } from '../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/user/userSlice'

export const Profile: FC = memo(() => {
  const [preview, setPreview] = useState('')
  const [image, setImage] = useState<any>()
  const [key, setKey] = useState(1)
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    console.log(files)
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
    <>
      <div>{user.name}'s Profile</div>
      email:{user.email}
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
      <input key={key} type="file" name="" id="" onChange={handleChangeFile} />
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
          window.confirm(url)
          setPreview('')
          setImage('')
          setKey((key) => key + 1)
        }}
      >
        アップロード
      </button>
    </>
  )
})
