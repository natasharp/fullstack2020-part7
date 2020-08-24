import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    if (event.type.includes('change')) {
      setValue(event.target.value)
    } else if (event.type.includes('click')) {
      setValue('')
    }
  }

  return {
    type,
    value,
    onChange,
  }
}
