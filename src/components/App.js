import React, {useState} from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import LightTheme from '../themes/light';
import DarkTheme from '../themes/dark';

const GlobalStyle = createGlobalStyle`
  body{
    background: ${p => p.theme.bodyBackgroundColor};
    min-height: 100vh;
    margin: 0;
    color: ${p => p.theme.bodyFontColor};
    font-family: 'Kaushan Script';
  }
`;

function App() {
  const [theme, setTheme] = useState(LightTheme);
  return (
    <ThemeProvider theme={{...theme, setTheme: () => {
			setTheme(s => s.id === 'light' ? DarkTheme : LightTheme);}}}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
