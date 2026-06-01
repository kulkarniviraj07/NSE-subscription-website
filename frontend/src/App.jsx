import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";

function App() {
    return (
        <AuthProvider>
            <AppProvider>
                <AppRoutes />
            </AppProvider>
        </AuthProvider>
    );
}

export default App;