/* eslint-disable react/require-render-return */
import React, {Component} from 'react'
import {BrowserRouter, Route , Switch} from 'react-router-dom'
import cesiumViewer from './page/cesiumViewer/index'

export default class Router extends Component {
    render() {
      <BrowserRouter>
      <Switch>
          <Route path="/" component= {cesiumViewer}/>
      </Switch>
      </BrowserRouter>
    }
} 