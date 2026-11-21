import { requiterole } from '@/data/core'
import React from 'react'

export const layout = async ({children}: {children: React.ReactNode}) => {
    await requiterole("admin")
  return (
    <div>{children}</div>
  )
}

export default layout
