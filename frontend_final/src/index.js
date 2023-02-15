import {store, persistor} from './store'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import Profile from './components/ProfilePage/Profile';
import LogInPage from './components/LogInPage';
import { fetchUsers, fetchPosts } from './reducers';
import MainPage from './components/MainPage/MainPage';
import { PersistGate } from 'redux-persist/integration/react';
import Protected from './components/ProtectedRoutes';
import reportWebVitals from './reportWebVitals';
import HandleGoogle from './components/HandleGoogle';

const root = ReactDOM.createRoot(document.getElementById('root'));
store.dispatch(fetchUsers)
store.dispatch(fetchPosts)

//Todo make sure user cannot access protected page before logging in
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route exact path={"/"} element={<LandingPage />} />
            <Route path={"/login"} element={<LogInPage/>} />
            <Route path={"/handleGoogle"} element={<HandleGoogle/>} />
            <Route element={<Protected/>}>
              <Route path={"/profile"} element={<Profile />} />
              <Route path={"/main"} element={<MainPage/>} />
            </Route>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
