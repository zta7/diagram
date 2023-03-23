import HmiDiagram from 'components/HmiDiagram'

HmiDiagram
function App() {
  return (
    <div className="h-screen w-screen">
      <div className="flex h-full w-full flex-row">
        <div>1</div>
        <HmiDiagram />
        <div>3</div>
      </div>
    </div>
  )
}

export default App
