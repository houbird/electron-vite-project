import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import routes from '../../routes/Sidebar'
import Home from '@heroicons/react/20/solid/HomeIcon'

interface MatchResult {
  isExact: boolean
  path: string
  url: string
  breadcrumbName: string
}

function matchPath (pathname: string, path: string): MatchResult | null {
  const isExact = pathname === path

  if (!isExact) return null

  return {
    isExact,
    path,
    url: path,
    breadcrumbName: path.split('/').pop() ?? ''
  }
}

function findBreadcrumbName (pathname: string, routes: any[]): Array<{ name: string, path: string, icon: string }> {
  for (const route of routes) {
    const match = matchPath(pathname, route.path)

    if (match) {
      return [{ name: route.name, path: route.path, icon: route.icon }]
    }

    if (route.submenu) {
      const submenuNames = findBreadcrumbName(pathname, route.submenu)
      if (submenuNames.length) {
        return [{ name: route.name, path: route.path, icon: route.icon }, ...submenuNames]
      }
    }
  }
  return []
}

const Breadcrumbs = () => {
  const location = useLocation()
  const breadcrumbNames = findBreadcrumbName(location.pathname, routes)

  return (
    <div className='breadcrumbs'>
      <ul>
        <li>
          <Link to="/">
          <Home/>
          Home
          </Link>
        </li>
        {breadcrumbNames.map((breadcrumb, index) => (
        <li key={index}>
          {index !== breadcrumbNames.length - 1
            ? (
                breadcrumb.path !== ''
                  ? (
              <Link to={breadcrumb.path}>
                {breadcrumb.icon}
                {breadcrumb.name}
              </Link>
                    )
                  : (
                <>
                  {breadcrumb.icon}
                  {breadcrumb.name}
                </>
                    )
              )
            : (
            <>
              {breadcrumb.icon}
              {breadcrumb.name}
            </>
              )}
          </li>
        ))}

      </ul>
    </div>
  )
}

export default Breadcrumbs
