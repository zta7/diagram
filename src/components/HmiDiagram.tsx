import createEngine, {
  DefaultNodeModel,
  BaseEvent,
  DiagramModel
} from '@projectstorm/react-diagrams'
import { CanvasWidget } from '@projectstorm/react-canvas-core'
import { TextFactory, TextNodeModel } from './diagram/Text'

export default () => {
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
      eventDidFire: (evt: BaseEvent) => {
        console.log(evt)
      }
    })
  })

  engine.setModel(model)

  return (
    <div className="w-0 grow">
      <CanvasWidget engine={engine} className="h-full w-full" />
    </div>
  )
}
