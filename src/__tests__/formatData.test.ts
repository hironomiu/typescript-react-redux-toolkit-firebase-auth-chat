import { formatDate } from '../lib'

describe('formatData', () => {
  it('formatData', () => {
    expect(formatDate(new Date('2022-01-01 00:00:00'))).toEqual(
      '2022-01-01 00:00:00'
    )
    expect(formatDate(new Date('2022-01-01'))).toEqual('2022-01-01 09:00:00')
  })
})
