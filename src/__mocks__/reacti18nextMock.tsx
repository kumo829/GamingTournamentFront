import * as i18nextMocks from './i18nextMocks'

export const useTranslation = () => {
  return {
    t: i18nextMocks.mockT,
    i18n: {
      changeLanguage: async () => await new Promise(() => {})
    }
  }
}

export const Trans = ({ i18nKey, children }: any): string => {
  console.log(i18nKey)

  return i18nextMocks.mockT(i18nKey)
}
