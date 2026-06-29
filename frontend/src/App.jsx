import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";

import AppRoutes from "./routes/AppRoutes";

function App() {
return (
    <AuthProvider>
    <AppProvider>
        <BrowserRouter basename="/portal">
        <AppRoutes />
        </BrowserRouter>
    </AppProvider>
    </AuthProvider>
);
}

export default App;