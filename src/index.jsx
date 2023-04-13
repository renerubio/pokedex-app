import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import i18next from './resources/i18next'
import store from './store'
import { Provider } from 'react-redux'
import { Pokedex } from './components'
import { ThemeProvider } from './context/Theme'
import './styles/index.scss'
import './styles/themes.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18next}>
            <ThemeProvider>
                <Pokedex />
            </ThemeProvider>
        </I18nextProvider>
    </Provider>
)
