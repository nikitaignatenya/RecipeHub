import "./App.css";
import { VITE_API_URL } from "./configs/dotenv-config";

function App() {
  return <div>{VITE_API_URL}</div>;
}

export default App;
