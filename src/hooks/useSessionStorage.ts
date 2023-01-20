import { useState } from 'react'

const useSessionStorage = (itemName: string, initialValue: any): readonly [any, (_: any) => void] => {
  const localStorageItem = localStorage.getItem(itemName)

  let parsedItem

  if (localStorageItem == null) {
    localStorage.setItem(itemName, JSON.stringify(initialValue))
    parsedItem = []
  } else {
    parsedItem = JSON.parse(localStorageItem)
  }

  const [item, setItem] = useState(parsedItem)

  const saveItem = (newItem: any): void => {
    const stringifiedItem: string = JSON.stringify(newItem)
    localStorage.setItem(itemName, stringifiedItem)
    setItem(newItem)
  }

  return [item, saveItem] as const
}

export default useSessionStorage
