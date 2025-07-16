import "./App.css";
import { Outlet } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";

function App() {
    return (
        <AppProvider>
            <Outlet />
        </AppProvider>
    );
}

export default App;
