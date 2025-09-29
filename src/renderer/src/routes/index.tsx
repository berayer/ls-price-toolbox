import { createFileRoute } from '@tanstack/react-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAppStore } from '@/stores'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { differenceWith } from 'es-toolkit'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table'
import { X } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex h-full p-2">
      <Tabs defaultValue="1" className="w-full">
        <TabsList>
          <TabsTrigger value="1">板材报价</TabsTrigger>
          <TabsTrigger value="2">物品报价</TabsTrigger>
          <TabsTrigger value="3">组件报价</TabsTrigger>
        </TabsList>
        <TabsContent value="1" className="flex gap-4">
          <BoardPice />
        </TabsContent>
        <TabsContent value="2" className="flex">
          物品报价
        </TabsContent>
        <TabsContent value="3" className="flex">
          组件报价
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BoardPricePopover({
  selectColors,
  setSelectColors,
}: {
  selectColors: SQLITE.Color[]
  setSelectColors: (colors: SQLITE.Color[]) => void
}) {
  const colors = useAppStore((state) => state.colors)
  // 过滤输入框的绑定值
  const [value, setValue] = useState('')

  // 筛选可选项
  const options = !value
    ? []
    : differenceWith(colors, selectColors, (a, b) => a.id === b.id)
        .filter((it) => it.full_name.toLowerCase().includes(value.toLowerCase()))
        .sort((a, b) => a.code.localeCompare(b.code))

  // 处理输入框回车事件
  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (options.length === 1) {
        setSelectColors([...selectColors, options[0]])
        setValue('')
      }
    }
  }

  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="选择花色"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        onKeyUp={handleEnter}
      />
      <Button
        variant="ghost"
        className={cn('absolute top-1.5 right-1 size-6', !value && 'hidden')}
        onClick={() => setValue('')}
      >
        <X />
      </Button>
      <Command
        className={cn(
          'absolute top-12 z-50 h-fit max-h-[300px] rounded-md border shadow-md outline-hidden',
          !value && 'hidden',
        )}
      >
        <CommandList>
          <CommandEmpty>无数据</CommandEmpty>
          <CommandGroup>
            {options.map((it) => (
              <CommandItem
                key={it.id}
                onSelect={() => {
                  setSelectColors([...selectColors, it])
                }}
              >
                {`${it.code}\t${it.name}`}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

function BoardPice() {
  // 选择的花色数组
  const [selectColors, setSelectColors] = useState<SQLITE.Color[]>([])
  const mats = useAppStore((state) => state.mats)
  const priceTypes = useAppStore((state) => state.priceTypes)

  // 排序
  selectColors.sort((a, b) => a.code.localeCompare(b.code))

  return (
    <>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex gap-4">
          <BoardPricePopover {...{ selectColors, setSelectColors }} />
          <Button variant="outline" disabled={!selectColors.length} onClick={() => setSelectColors([])}>
            清除
          </Button>
        </div>
        <ScrollArea className="flex-1 overflow-auto border contain-size">
          <Table>
            <TableHeader className="bg-accent sticky top-0">
              <TableRow>
                <TableHead>序号</TableHead>
                <TableHead>编码</TableHead>
                <TableHead>名称</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectColors.map((it, idx) => (
                <TableRow key={it.id}>
                  <TableCell className="py-0">{idx + 1}</TableCell>
                  <TableCell className="py-0">{it.code}</TableCell>
                  <TableCell className="py-0">{it.name}</TableCell>
                  <TableCell className="py-0">
                    <Button
                      variant="link"
                      className="text-destructive"
                      size="sm"
                      onClick={() => {
                        setSelectColors(selectColors.filter((color) => color.id !== it.id))
                      }}
                    >
                      删除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* 表尾最后一条线 */}
            <TableFooter>
              <TableRow />
            </TableFooter>
          </Table>
        </ScrollArea>
      </div>
      <div className="flex flex-2 flex-col gap-4">
        {/* 基材选择区域 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-[64px]">基材</span>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {mats.map((it) => (
                    <SelectItem key={it.id} value={String(it.id)}>
                      {it.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-[64px]">规格</span>
            <Input type="number" placeholder="2440 / 2750" className="w-[150px]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-[64px]">厚度</span>
            <Input type="number" placeholder="9 / 18 / 25" className="w-[150px]" />
          </div>
        </div>
        {/* 价格录入区域 */}
        {/* <div className="flex-1 border"> */}
        <Tabs defaultValue="1" className="h-full">
          <TabsList>
            <TabsTrigger value="1">基础</TabsTrigger>
            <TabsTrigger value="2">抽屉</TabsTrigger>
            <TabsTrigger value="3">门抽</TabsTrigger>
            <TabsTrigger value="4">KM34</TabsTrigger>
            <TabsTrigger value="5">KM43</TabsTrigger>
          </TabsList>
          <TabsContent value="1" className="border">
            <div className="h-full space-y-2 overflow-auto p-2 contain-size">
              {priceTypes.map((it) => (
                <div key={it.id} className="flex items-center gap-2">
                  <span className="w-[64px]">{it.name}</span>
                  <Input type="number" placeholder={it.unit == 1 ? '米' : '平方'} className="w-[150px]" />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="2" className="border">
            抽屉报价
          </TabsContent>
          <TabsContent value="3" className="border">
            门抽报价
          </TabsContent>
          <TabsContent value="4" className="border">
            KM34报价
          </TabsContent>
          <TabsContent value="5" className="border">
            KM43报价
          </TabsContent>
        </Tabs>
        <div className="flex justify-end gap-2">
          <Button>保存</Button>
        </div>
        {/* </div> */}
      </div>
    </>
  )
}
