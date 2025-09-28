import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex h-full flex-col p-2">
      <div className="h-12 bg-red-200">header</div>
      <div className="flex-1 overflow-auto bg-green-200">
        <div className="h-[1200px]">content</div>
      </div>
    </div>
  )
}
