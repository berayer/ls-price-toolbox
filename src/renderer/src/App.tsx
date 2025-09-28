import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { cn } from './lib/utils'

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
]

function App(): React.JSX.Element {
  const [value, setValue] = useState('')
  const [select, setSelect] = useState<string[]>([])

  const options = frameworks.filter((item) => {
    if (select.includes(item.value)) {
      return false
    }
    return item.value.toLowerCase().includes(value.toLowerCase())
  })

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  return (
    <div>
      <header className="drag bg-accent h-12"></header>
      <div className="p-4">
        <Popover open={true}>
          <PopoverTrigger asChild>
            <Input type="text" placeholder="搜索" value={value} onChange={handleInput} />
          </PopoverTrigger>
          <PopoverContent className={cn(!value && 'hidden', 'p-0')}>
            <Command>
              {/* <CommandInput placeholder="Search framework..." className="h-9" /> */}
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {options.map((f) => (
                    <CommandItem
                      key={f.value}
                      value={f.value}
                      onSelect={() => {
                        setSelect([...select, f.value])
                      }}
                    >
                      {f.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="min-h-20 w-full border p-4">
        {select.map((item, idx) => (
          <div key={idx}>{item}</div>
        ))}
      </div>
    </div>
  )
}

export default App
