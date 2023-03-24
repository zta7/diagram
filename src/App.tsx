import createEngine, {
  BaseEvent,
  DiagramModel
} from '@projectstorm/react-diagrams'
import { CanvasWidget } from '@projectstorm/react-canvas-core'
import { TextFactory, TextNodeModel } from 'components/diagram/Text'

function App() {
  const engine = createEngine()
  const model = new DiagramModel()

  engine.getNodeFactories().registerFactory(new TextFactory())

  const node1 = new TextNodeModel({ value: 'abc' })
  node1.setPosition(100, 100)

  const node2 = new TextNodeModel({ value: 'rgb(0,192,255)' })
  node2.setPosition(200, 100)

  const models = model.addAll(node1, node2)

  models.forEach((item) => {
    item.registerListener({
      selectionChanged(event: any) {
        console.log(event)
        // if(event)
      }
    })
  })

  // model.sele

  engine.setModel(model)

  return (
    <div className="h-screen w-screen">
      <div className="flex h-full w-full flex-row">
        <div>1</div>
        <div className="w-0 grow">
          <CanvasWidget engine={engine} className="h-full w-full" />
        </div>
        <div>22</div>
      </div>
    </div>
  )
}

export default App
