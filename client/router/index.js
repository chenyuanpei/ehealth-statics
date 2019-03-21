import React from 'react'
import Router from 'react-router/lib/Router'
import routesAsync from './routes'

export default function (history) {
  return (
    <Router history={history} routes={routesAsync}>
    </Router>
  )
}
