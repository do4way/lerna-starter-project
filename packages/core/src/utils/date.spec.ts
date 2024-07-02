import { warekiDate } from './date'
describe('Date utils', () => {
    it('warekiDate', () => {
        const date = new Date('2021-01-01')
        expect(warekiDate(date)).toBe('令和3年1月1日')
    })
})
