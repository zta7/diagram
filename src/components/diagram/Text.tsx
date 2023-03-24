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
  value: string
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
    const { selected, value } = this.props.node.getOptions()
    const className = cx(['border-2', selected && 'border-black'])
    return (
      <div className={className}>
        <div>{value}</div>
      </div>
    )
  }
}

export class TextNodeModel extends NodeModel {
  value: string | number
  constructor({ value, ...options }: TextOptions) {
    super({
      ...options,
      type
    })
    this.value = value
  }

  setValue(value: string | number) {
    this.value = value
  }

  getOptions() {
    return {
      ...super.getOptions(),
      value: this.value
    }
  }

  serialize() {
    return {
      ...super.serialize()
    }
  }

  deserialize(event: DeserializeEvent<this>): void {
    super.deserialize(event)
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
    return new TextNodeModel({ value: '' })
  }

  generateReactWidget(event: GenerateWidgetEvent<TextNodeModel>) {
    return <TextNodeWidget engine={this.engine} node={event.model} />
  }
}
