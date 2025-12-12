import React, { useEffect } from "react";
import Routes from "./Routes";
import { authActions } from "./store/authStore";

const App: React.FC = () => {
    // Initialize auth state on app load
    useEffect(() => {
        authActions.initAuth();
    }, []);

    return <Routes />;
};

export default App;