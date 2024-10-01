'use client'

import React, { createContext, useState } from 'react'
import { useCookies } from 'react-cookie'
export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [cookie, setCookie] = useCookies(['token'])
  const [isAuthentiCated, setIsAuthentiCated] = useState(cookie.token ? true : false)
  const [searchDtl, setSearchDtl] = useState({})
  const [user, setUser] = useState({})

  const setSearchDetails = (payload) => {
    setSearchDtl({
      ...searchDtl,
      ...payload,
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        auth: [isAuthentiCated, setIsAuthentiCated],
        searchDtl,
        setSearchDetails,
        user: [user, setUser],
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
export default GlobalContext
