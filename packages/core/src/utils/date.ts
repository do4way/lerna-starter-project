import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'

dayjs.extend(utc)
dayjs.extend(timezone)

const warekiDateLongFormatWithTz: { [key: string]: Intl.DateTimeFormat } = {}

const warekiDateLongFormat = (tz?: string) => {
    const timeZone: string = tz || '__default__'
    let formatter = warekiDateLongFormatWithTz[timeZone]
    if (!formatter) {
        formatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
            era: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            ...(tz === '__default__'
                ? {}
                : {
                      timeZone: tz,
                  }),
        })
        warekiDateLongFormatWithTz.timeZone = formatter
    }
    return formatter
}

/**
 * 和暦日付
 * @param date
 * @param strDefault
 * @param defaultTimezone
 * @returns
 * @example
 *    warekiDate(date)
 *    warekiDate(undefine, "2024-01-01")
 *    warekiDate(date, undefine, 'Asia/Tokyo')
 */
export const warekiDate = (
    date?: Date,
    strDefault?: string,
    defaultTimezone?: string,
) => {
    if (date) {
        if (defaultTimezone) {
            const dateWithTz = dayjs.utc(date).tz(defaultTimezone)
            return warekiDateLongFormat(defaultTimezone).format(
                dateWithTz.toDate(),
            )
        }
        return warekiDateLongFormat(defaultTimezone).format(date)
    }
    return strDefault || ''
}

/**
 * 和暦時間
 * @param date
 * @param strDefault
 * @param defaultTimezone
 * @returns
 * @example
 *    warekiTime(date)
 *    warekiTime(undefine, "--:--")
 *    warekiTime(date, undefine, 'Asia/Tokyo')
 */
export const warekiTime = (
    date?: Date,
    strDefault?: string,
    defaultTimezone?: string,
) => {
    if (date) {
        if (defaultTimezone) {
            const dateWithTz = dayjs.utc(date).tz(defaultTimezone)
            return `${warekiDateLongFormat(defaultTimezone).format(dateWithTz.toDate())} ${dateWithTz.format('HH:mm')}`
        }
        return `${warekiDateLongFormat(defaultTimezone).format(date)} ${dayjs(date).format('HH:mm')}`
    }
    return strDefault || ''
}

export const formatDate = (
    date?: Date,
    strDefault?: string,
    formatter = 'YYYY/MM/DD HH:mm',
    defaultTimezone?: string,
) => {
    if (defaultTimezone) {
        return date
            ? `${dayjs.utc(date).tz(defaultTimezone).format(formatter)}`
            : strDefault || ''
    }
    return date ? `${dayjs(date).format(formatter)}` : strDefault || ''
}

export const formatUTCDate = (date?: Date, formatter?: string) =>
    dayjs.utc(date).format(formatter)
