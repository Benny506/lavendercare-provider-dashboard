import { HashRouter } from "react-router-dom"
import AppRoutes from "./routes/Routes"
import { ToastContainer } from "react-toastify"
import AppLoading from "./components/appLoading/AppLoading"

import './App.css'

const App = () => {
  return (
    <HashRouter>
      <AppLoading />

      <AppRoutes />

      <ToastContainer />
    </HashRouter>
  )
}

export default App