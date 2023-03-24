import {
  BaseModelOptions,
  NodeModel,
  DeserializeEvent,
  GenerateWidgetEvent,
  DiagramEngine,
  AbstractReactFactory
} from '@projectstorm/react-diagrams'
import React from 'react'
import cx from 'classnames'

const type = 'text'

interface TextOptions extends BaseModelOptions {
  value?: string
}

interface TextWidgetProps {
  node: TextNodeModel
  engine: DiagramEngine
}

class TextNodeWidget extends React.Component<TextWidgetProps, object> {
  constructor(props: TextWidgetProps) {
    super(props)
  }
  render() {
    const { selected } = this.props.node.getOptions()
    const className = cx(['border-2', selected && 'border-black'])
    return (
      <div className={className}>
        <div>{this.props.node.value}</div>
      </div>
    )
  }
}

export class TextNodeModel extends NodeModel {
  value: string

  constructor(options: TextOptions = {}) {
    super({
      ...options,
      type
    })
    this.value = options.value || 'Text'
  }

  serialize() {
    return {
      ...super.serialize(),
      value: this.value
    }
  }

  deserialize(event: DeserializeEvent<this>): void {
    super.deserialize(event)
    this.value = event.data.value
  }
}

export class TextFactory extends AbstractReactFactory<
  TextNodeModel,
  DiagramEngine
> {
  constructor() {
    super(type)
  }

  generateModel() {
    return new TextNodeModel()
  }

  generateReactWidget(event: GenerateWidgetEvent<TextNodeModel>) {
    return <TextNodeWidget engine={this.engine} node={event.model} />
  }
}
