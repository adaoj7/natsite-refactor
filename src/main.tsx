import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./app.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.ts";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="dev-ppwy2ztmkc8qhczn.us.auth0.com"
    clientId="2E49IGFsP0ZYrxrlTWZNB3RU3maxsCTW"
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </Auth0Provider>
);
