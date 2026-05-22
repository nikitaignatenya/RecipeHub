import { RouterProvider } from "../app/providers/RouterProvider";
import { AppRouter } from "./routing/AppRouter";

function App() {
  return (
    <RouterProvider>
      <AppRouter />
    </RouterProvider>
  );
}

export default App;
