import "./App.css";
import Group from "./Pages/Group";
import Pop from "./Pocket/popUp/Pop";
import { ChatProvider } from "./Context/ChatProvider.jsx";

function App() {
  return (
    <>
      <ChatProvider>
        <Group />
        <Pop />
      </ChatProvider>
    </>
  );
}

export default App;
