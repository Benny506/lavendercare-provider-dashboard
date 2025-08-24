import { HashRouter } from "react-router-dom"
import AppRoutes from "./routes/Routes"
import { ToastContainer } from "react-toastify"
import AppLoading from "./components/appLoading/AppLoading"

import './App.css'
import { ErrorBoundary } from "react-error-boundary"
import AppCrash from "./pages/appCrash/AppCrash"

const App = () => {
  return (
    <HashRouter>
      <ErrorBoundary fallback={<AppCrash />}>
        <AppLoading />

        <AppRoutes />

        <ToastContainer />
      </ErrorBoundary>
    </HashRouter>
  )
}

export default App