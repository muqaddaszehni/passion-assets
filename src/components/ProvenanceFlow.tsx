import { useMemo } from 'react'
import {
  Background,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { ProvenanceStep } from '../types'

type StepData = ProvenanceStep & { index: number; last: boolean }

function StepNode({ data }: NodeProps) {
  const d = data as unknown as StepData
  return (
    <div className="w-[188px] border border-hairline bg-white px-3.5 py-3 shadow-plate">
      <Handle type="target" position={Position.Left} isConnectable={false} />
      <div className="flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center border border-brass/60 text-[10px] text-brass">
          {d.index + 1}
        </span>
        <span className="eyebrow text-charcoal/40">
          {d.last ? 'Current' : 'Provenance'}
        </span>
      </div>
      <div className="mt-2 font-serif text-[15px] leading-tight text-navy">
        {d.title}
      </div>
      <div className="mt-0.5 text-[11px] text-charcoal/55">{d.detail}</div>
      <Handle type="source" position={Position.Right} isConnectable={false} />
    </div>
  )
}

const nodeTypes = { step: StepNode }

export default function ProvenanceFlow({ steps }: { steps: ProvenanceStep[] }) {
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = steps.map((s, i) => ({
      id: s.id,
      type: 'step',
      position: { x: i * 224, y: 0 },
      data: { ...s, index: i, last: i === steps.length - 1 },
      draggable: false,
      selectable: false,
    }))
    const edges: Edge[] = steps.slice(1).map((s, i) => ({
      id: `${steps[i].id}-${s.id}`,
      source: steps[i].id,
      target: s.id,
      type: 'smoothstep',
      animated: false,
    }))
    return { nodes, edges }
  }, [steps])

  return (
    <div className="h-[180px] w-full border border-hairline bg-ivory/40">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.16 }}
        minZoom={0.1}
        maxZoom={1.1}
        onInit={(inst) => inst.fitView({ padding: 0.16 })}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#D8D2C6" gap={22} size={1} />
      </ReactFlow>
    </div>
  )
}
