/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

export const useReplace = (url, find, replace) => {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (url) {
      const replacedUrl = url.replace(find, replace)
      setImageUrl(replacedUrl)
    }
  }, [url])

  return imageUrl
}
