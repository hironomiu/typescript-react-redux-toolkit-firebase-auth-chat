import { FC, memo } from 'react'

type Props = {
  title: string
  testId: string
  styles?: string
  disabled?: boolean
  handleClick: () => void
}

const Button: FC<Props> = memo(
  ({
    title,
    testId,
    styles = 'mx-2 py-2 px-5 bg-gray-200 font-bold rounded focus:outline-gray-600 border-solid border-2 hover:bg-black hover:text-white hover:font-bold',
    disabled,
    handleClick,
  }) => {
    return (
      <>
        <button
          className={styles}
          data-testid={testId}
          onClick={handleClick}
          disabled={disabled}
        >
          {title}
        </button>
      </>
    )
  }
)

export default Button
