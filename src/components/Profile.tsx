import { FC, memo, useState } from 'react'
import { storageRef } from '../firebase'
import { useSelector } from 'react-redux'
import {
  selectUserName,
  selectUserEmail,
  selectUserPhotoURL,
  selectUserUid,
} from '../features/user/userSlice'

export const Profile: FC = memo(() => {
  const [preview, setPreview] = useState('')
  const [image, setImage] = useState<any>()
  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setPreview(window.URL.createObjectURL(files[0]))
    setImage(e.target.files.item(0))
  }
  const name = useSelector(selectUserName)
  const email = useSelector(selectUserEmail)
  const photoURL = useSelector(selectUserPhotoURL)
  const uid = useSelector(selectUserUid)

  return (
    <>
      <div>{name}'s Profile</div>
      <input type="file" name="" id="" onChange={handleChangeFile} />

      <div className="flex -space-x-2 overflow-hidden flex-col px-4">
        {preview ? (
          <img
            className="inline-block h-14 w-14 rounded-full ring-2 ring-white"
            src={preview}
            alt=""
          />
        ) : (
          'no image'
        )}
        <button
          onClick={() => {
            // if (
            //   typeof image === 'Blob' ||
            //   typeof image === 'Uint8Array' ||
            //   typeof image === 'ArrayBuffer'
            // ) {
            storageRef.child('images/hogehgoe').put(image)
            // }
          }}
        >
          アップロード
        </button>
      </div>
    </>
  )
})
