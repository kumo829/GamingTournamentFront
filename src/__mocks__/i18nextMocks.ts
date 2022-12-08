import * as jsonfiles from '../../public/locales/en/translation.json'
import { getProperty } from 'dot-prop-ts'

const translationFile = JSON.parse(JSON.stringify(jsonfiles))

export function mockT (i18nKey: string): string {
  const value = getProperty(translationFile, i18nKey) as string

  return value != null ? value : i18nKey
}

const i18next: any = jest.createMockFromModule('react-i18next')
i18next.t = mockT
i18next.language = 'en'
i18next.changeLanguage = async (locale: string) => await new Promise(() => { })

export default i18next
