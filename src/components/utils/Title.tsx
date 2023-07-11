import React from 'react'
import { Helmet } from 'react-helmet'

/*
# Title Rule
## Home Page: `Brand name` + `Brand core concept`
### Aetina - Leading Edge AI Solution Provider

## Inner page: `Page Title` + `Brand name`
### News - Aetina
### Sitemap - Aetina
### Download - Aetina
### Resources - Aetina
### RMA Service - Aetina

## Inner page with folder: `Page Title` + `Folder Name` + `Brand name`
### Retail - Industries - Aetina
### Factory - Industries - Aetina
### Transportation - Industries - Aetina
### Edge AI Solutions - Product - Aetina
### AI Accelerator & GPU - Product - Aetina
### Multi-Display Series - Product - Aetina
*/

interface HelmetProps {
  title: string | undefined
  replaceAll?: boolean
}
const Title = ({ title = '', replaceAll = false }: HelmetProps) => {
  const Title = `${title}${!replaceAll ? '｜Aetina' : ''}`
  return (
    <>
      <Helmet>
        <title>{ Title }</title>
      </Helmet>
    </>
  )
}

export default Title
