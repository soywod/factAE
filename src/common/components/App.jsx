import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import moment from 'moment'
import Layout from 'antd/es/layout'
import AntdProvider from 'antd/es/locale-provider'
import en from 'antd/es/locale-provider/en_GB'
import fr from 'antd/es/locale-provider/fr_FR'

import {useAuthService} from '../../auth/hooks'
import {useProfileService} from '../../profile/hooks'
import {useClientService} from '../../client/hooks'
import {useDocumentService} from '../../document/hooks'
import PrivateRoute from '../../auth/components/PrivateRoute'
import Auth from '../../auth/components/Auth'
import Profile from '../../profile/components/Edit'
import ClientList from '../../client/components/List'
import ClientEdit from '../../client/components/Edit'
import DocumentList from '../../document/components/List'
import DocumentEdit from '../../document/components/Edit'
import Dashboard from '../../dashboard/components'
import CookieConsent from './CookieConsent'
import Sider from './Sider'

import 'moment/locale/fr'
import 'moment/locale/en-gb'

import './App.styles.css'

const locales = {en, fr}

function App() {
  const [width, setWidth] = useState(200)
  const {i18n} = useTranslation()

  useAuthService()
  useProfileService()
  useClientService()
  useDocumentService()

  useEffect(() => {
    moment.locale(i18n.language)
  }, [i18n.language])

  return (
    <AntdProvider locale={locales[i18n.language]}>
      <Layout>
        <Router>
          <Layout.Sider style={{height: '100vh', left: 0, overflow: 'auto', position: 'fixed'}}>
            <Sider onCollapse={setWidth} />
          </Layout.Sider>
          <Layout style={{marginLeft: width, zIndex: 1}}>
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/demo" component={Auth.Demo} />
              <PrivateRoute path="/logout" component={Auth.Logout} />
              <PrivateRoute path="/documents/:id" component={DocumentEdit} />
              <PrivateRoute path="/documents" component={DocumentList} />
              <PrivateRoute path="/clients/:id" component={ClientEdit} />
              <PrivateRoute path="/clients" component={ClientList} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute expact path="/" component={Dashboard} />
              <Redirect to="/" />
            </Switch>
          </Layout>
        </Router>
        <CookieConsent />
      </Layout>
    </AntdProvider>
  )
}

export default App