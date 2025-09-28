import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

function App(): React.JSX.Element {
  const [value, setValue] = useState('')

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  return (
    <div>
      <header className="drag bg-accent h-12"></header>
      <div className="p-4">
        <Popover open={!!value}>
          <PopoverTrigger asChild>
            <Input type="text" placeholder="搜索" value={value} onChange={handleInput} />
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div>{value}</div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default App
