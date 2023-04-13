import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import i18next from './resources/i18next'
import store from './store'
import { Provider } from 'react-redux'
import { Pokedex } from './components'
import './styles/index.scss'
import './styleslight-theme.scss'
import './dark-theme.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18next}>
            <Pokedex />
        </I18nextProvider>
    </Provider>
)
