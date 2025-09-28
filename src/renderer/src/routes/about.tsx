import { createFileRoute } from '@tanstack/react-router'
import { ScrollArea } from '@/components/ui/scroll-area'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <ScrollArea className="h-full">
      <div className="p-2">
        <div className="h-[2000px] bg-amber-700">Hello from About!</div>
      </div>
    </ScrollArea>
  )
}
