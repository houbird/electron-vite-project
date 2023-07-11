import React from 'react'
import { Helmet } from 'react-helmet'

/*
# Title Rule
## Home Page: `Brand name` + `Brand core concept`
### WEBSITETITLE - Leading Edge AI Solution Provider

## Inner page: `Page Title` + `Brand name`
### News - WEBSITETITLE
### Sitemap - WEBSITETITLE
### Download - WEBSITETITLE
### Resources - WEBSITETITLE
### RMA Service - WEBSITETITLE

## Inner page with folder: `Page Title` + `Folder Name` + `Brand name`
### Retail - Industries - WEBSITETITLE
### Factory - Industries - WEBSITETITLE
### Transportation - Industries - WEBSITETITLE
### Edge AI Solutions - Product - WEBSITETITLE
### AI Accelerator & GPU - Product - WEBSITETITLE
### Multi-Display Series - Product - WEBSITETITLE
*/

interface HelmetProps {
  title: string | undefined
  replaceAll?: boolean
}
const Title = ({ title = '', replaceAll = false }: HelmetProps) => {
  const Title = `${title}${!replaceAll ? '｜WEBSITETITLE' : ''}`
  return (
    <>
      <Helmet>
        <title>{ Title }</title>
      </Helmet>
    </>
  )
}

export default Title
