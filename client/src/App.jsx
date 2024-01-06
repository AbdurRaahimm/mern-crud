import { Route, Routes } from "react-router-dom"
import UserList from "./pages/UserList"
import Update from "./pages/Update"

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/update/:id" element={<Update />} />
    </Routes>
  )
}

export default App
