
import React, {useState, useEffect} from 'react';
import ContextProvider from "./ContextProvider";
import {RouterProvider} from "react-router-dom";
import router from "./routes/router"
import LoadingMarkup from './Components/loader/LoadingMarkup';
import languageConfig from "./lang/setup";
import { AuthProvider } from 'react-auth-kit';


languageConfig()

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 0);
        return () => clearTimeout(timer);
    }, [isLoading]);

    return (
        <div className="app">
            {isLoading ? (
               <LoadingMarkup/>
            ) : (
               
                    <AuthProvider authType = {'cookie'}
                                  authName={'_auth'}
                                  cookieDomain="localhost"
                                  cookieSecure ={false}
                        >
                        <ContextProvider>
                            <RouterProvider fallbackElement={LoadingMarkup} router={router} />
                        </ContextProvider>
                    </AuthProvider>
              
            )}
        </div>
    );
};

export default App;


