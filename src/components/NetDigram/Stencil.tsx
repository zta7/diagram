import { FunctionBlockDragOverlay, FunctionBlockNode } from 'components/diagram/nodes/FunctionBlock';
import { InputNode } from 'components/diagram/nodes/InputNode';
import {
  AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent,
} from 'components/ui/According';
import { Drag, DragProp } from 'components/ui/Drag';
import { DropIdEnum } from 'components/ui/Drop';
import { Input } from 'components/ui/Input';
import { Item } from 'components/ui/Item';
import { MdGifBox, MdInput } from 'react-icons/md';
import {
  ChangeEvent, ReactNode, useState,
} from 'react';

type StencilProp = Array<{
  id: string
  label: string
  children: Array<{
    id: string
    label: string
    icon: ReactNode
    dragProp: Pick<DragProp, 'dropTo' | 'dragOverlay' | 'dropData'>
  }>
 }>

const stencil: StencilProp = [
  {
    label: '用户输入控件',
    id: 'g',
    children: [
      {
        id: 'a',
        label: 'FunctionBlock',
        icon: <MdGifBox />,
        dragProp: {
          dropTo: [DropIdEnum.NETFLOW],
          dragOverlay: <FunctionBlockDragOverlay />,
          dropData: new FunctionBlockNode(
            {
              data: {
                name: '123',
                inputEvents: Array.from({ length: 10 }, (e, i) => ({ id: `inputEvent-${i}`, name: `inputEvent-${i}` })),
                outputEvents: Array.from({ length: 15 }, (e, i) => ({ id: `outputEvent-${i}`, name: `outputEvent-${i}` })),
                inputs: Array.from({ length: 15 }, (e, i) => ({ id: `input-${i}`, name: `input-${i}` })),
                outputs: Array.from({ length: 10 }, (e, i) => ({ id: `output-${i}`, name: `output-${i}` })),
                resource: '',
              },
            },
          ),
        },
      },
      {
        id: 'b',
        label: 'Input',
        icon: <MdInput />,
        dragProp: {
          dropTo: [DropIdEnum.NETFLOW],
          // dragOverlay: <FunctionBlockDragOverlay />,
          dropData: new InputNode({ data: { value: 'hello' } }),
        },
      },
    ],
  },
  {
    id: 'g2',
    label: '哈哈哈',
    children: [],
  },
];

export function Stencil() {
  const [search, setSearch] = useState('');
  return (
    <>
      <div className="h-8 border-b">
        <Input
          className="h-full w-full border-none"
          placeholder="Search"
          value={search}
          onInput={(evt: ChangeEvent<HTMLInputElement>) => setSearch(evt.target.value)}
        />
      </div>
      <AccordionRoot type="single">
        {
          stencil.map((e) => (
            <AccordionItem value={e.id} key={e.id}>
              <AccordionTrigger>{e.label}</AccordionTrigger>
              <AccordionContent>
                {
                  e.children.map((e2) => (
                    <Drag {...e2.dragProp} id={e2.id} key={e2.id}>
                      <Item className="flex items-center gap-2">
                        { e2.icon }
                        <div>{ e2.label }</div>
                      </Item>
                    </Drag>
                  ))
                }
              </AccordionContent>
            </AccordionItem>
          ))
        }

        {/* <AccordionItem value="item-1">
          <AccordionTrigger>用户输入控件</AccordionTrigger>
          <AccordionContent>
            <Drag
              id="drag-1"
              dropTo={[DropIdEnum.NETFLOW]}
              dragOverlay={<FunctionBlockDragOverlay />}
              dropData={new FunctionBlockNode(
                {
                  id: `${Math.random()}`,
                  type: 'FunctionBlock',
                  position: { x: 150, y: 150 },
                  data: {
                    name: '123',
                    inputEvents: Array.from({ length: 10 }, (e, i) => ({ id: `inputEvent-${i}`, name: `inputEvent-${i}` })),
                    outputEvents: Array.from({ length: 15 }, (e, i) => ({ id: `outputEvent-${i}`, name: `outputEvent-${i}` })),
                    inputs: Array.from({ length: 15 }, (e, i) => ({ id: `input-${i}`, name: `input-${i}` })),
                    outputs: Array.from({ length: 10 }, (e, i) => ({ id: `output-${i}`, name: `output-${i}` })),
                  },
                },
              )}
            >
              <Item className="flex items-center">
                <MdGifBox className="mr-2" />
                <div>FunctionBlock</div>
              </Item>
            </Drag>
            <Drag
              id="drag-2"
              dropTo={[DropIdEnum.NETFLOW]}
              dropData={new InputNode({
                id: `${Math.random()}`,
                type: 'Input',
                position: { x: 150, y: 150 },
                data: { value: '123' },
              })}
            >
              <Item className="flex items-center">
                <MdInput className="mr-2" />
                <div>Input</div>
              </Item>
            </Drag>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>显示控件</AccordionTrigger>
          <AccordionContent>
            Yes. It is unstyled by default, giving you freedom over the look and feel.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>画布控件</AccordionTrigger>
          <AccordionContent>
            Yes! You can animate the Accordion with CSS or JavaScript.
          </AccordionContent>
        </AccordionItem> */}
      </AccordionRoot>
    </>
  );
}
