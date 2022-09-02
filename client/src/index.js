import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import UserStore from './store/userStore';
import SnikerStore from './store/snikerStore';
import RoleStore from './store/roleStore';


export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Context.Provider value = {{
    user: new UserStore(),
    sniker: new SnikerStore(),
    role: new RoleStore()
}}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Context.Provider>
);


