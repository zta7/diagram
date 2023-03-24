import * as React from 'react'
import {
  AbstractReactFactory,
  LayerModel,
  AbstractDisplacementState
} from '@projectstorm/react-diagrams'

const HaloBoxType = 'halo-box'

export class HaloBoxLayerFactory extends AbstractReactFactory {
  constructor() {
    super(HaloBoxType)
  }
  generateModel() {
    return new HaloLayerModel()
  }
  generateReactWidget(event) {
    return React.createElement(HaloBoxWidget, { rect: event.model.box })
  }
}

export class HaloBoxWidget extends React.Component {
  render() {
    const { rect } = this.props
    if (!rect) return null
    return <div>1</div>
  }
}

export class HaloLayerModel extends LayerModel {
  constructor() {
    super({
      transformed: false,
      isSvg: false,
      type: HaloBoxType
    })
  }
  setBox(rect) {
    this.box = rect
  }
  getChildModelFactoryBank() {
    // is not used as it doesnt serialize
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return null as any
  }
}

export class HaloBoxState extends AbstractDisplacementState {
  layer: any
  constructor() {
    super({
      name: 'halo-layer'
    })
  }
  activated(previous: any) {
    super.activated(previous)
    this.layer = new HaloLayerModel()
    this.engine.getModel().addLayer(this.layer)
  }
  deactivated(next: any) {
    super.deactivated(next)
    this.layer.remove()
    this.engine.repaintCanvas()
  }
  getBoxDimensions(event: any) {
    let rel
    if ('touches' in event.event) {
      const touch = event.event.touches[0]
      rel = this.engine.getRelativePoint(touch.clientX, touch.clientY)
    } else {
      rel = this.engine.getRelativePoint(
        event.event.clientX,
        event.event.clientY
      )
    }
    return {
      left: rel.x > this.initialXRelative ? this.initialXRelative : rel.x,
      top: rel.y > this.initialYRelative ? this.initialYRelative : rel.y,
      width: Math.abs(rel.x - this.initialXRelative),
      height: Math.abs(rel.y - this.initialYRelative),
      right: rel.x < this.initialXRelative ? this.initialXRelative : rel.x,
      bottom: rel.y < this.initialYRelative ? this.initialYRelative : rel.y
    }
  }
  fireMouseMoved(event: any) {
    console.log(1)
    // this.layer.setBox(this.getBoxDimensions(event))
    // const relative = this.engine.getRelativeMousePoint({
    //   clientX: this.initialX,
    //   clientY: this.initialY
    // })
    // if (event.virtualDisplacementX < 0) {
    //   relative.x -= Math.abs(event.virtualDisplacementX)
    // }
    // if (event.virtualDisplacementY < 0) {
    //   relative.y -= Math.abs(event.virtualDisplacementY)
    // }
    // const rect = Rectangle.fromPointAndSize(
    //   relative,
    //   Math.abs(event.virtualDisplacementX),
    //   Math.abs(event.virtualDisplacementY)
    // )
    // for (const model of this.engine.getModel().getSelectionEntities()) {
    //   if (model.getBoundingBox) {
    //     const bounds = model.getBoundingBox()
    //     if (
    //       rect.containsPoint(bounds.getTopLeft()) &&
    //       rect.containsPoint(bounds.getBottomRight())
    //     ) {
    //       model.setSelected(true)
    //     } else {
    //       model.setSelected(false)
    //     }
    //   }
    // }
    // this.engine.repaintCanvas()
  }
}
