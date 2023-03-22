import { useState } from 'react'
import MainComponent from './Mainpage/MainComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MainComponent />
    </div>
  )
}

export default App
