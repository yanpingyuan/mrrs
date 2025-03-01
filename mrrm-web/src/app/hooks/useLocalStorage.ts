import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const isMounted = useRef(false)
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setValue(JSON.parse(item))
      }
    } catch (e) {
      console.log(e)
    }
    return () => {
      isMounted.current = false
    }
  }, [key])

  useEffect(() => {
    if (isMounted.current) {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      isMounted.current = true
    }
  }, [key, value])

  return [value, setValue]
}
// import { useState } from "react"

// const useLocalStorage = (key:string, initialValue:any) => {
//   const [state, setState] = useState(() => {
//     // Initialize the state
//     try {
//       const value = window.localStorage.getItem(key)
//       // Check if the local storage already has any values,
//       // otherwise initialize it with the passed initialValue
//       return value ? JSON.parse(value) : initialValue
//     } catch (error) {
//       console.log(error)
//     }
//   })

//   const setValue = (value:any) => {
//     try {
//       // If the passed value is a callback function,
//       //  then call it with the existing state.
//       const valueToStore = value instanceof Function ? value(state) : value
//       window.localStorage.setItem(key, JSON.stringify(valueToStore))
//       setState(value)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return [state, setValue]
// }

// export default useLocalStorage