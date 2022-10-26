import { autoPlacement, offset, shift, size, useFloating } from '@floating-ui/react-dom-interactions'
import { Listbox, Transition } from '@headlessui/react'
import { nanoid } from 'nanoid'
import { Fragment, useState } from 'react'
import { createPortal } from 'react-dom'

type Fruit = {
  id: string
  name: string
  disabled: boolean
}

const options = Array.from({ length: 330 }).map<Fruit>((v, i) => ({
  id: nanoid(),
  name: `苹果香蕉西红柿-${i + 1}-${nanoid()}`,
  disabled: i / 2 === 0,
}))

export default function Select2Route() {
  const [selectedFruit, setSelectedFruit] = useState<Fruit>()
  const { x, y, reference, floating, strategy } = useFloating({
    placement: 'top',
    middleware: [shift(), offset(8), size(), autoPlacement({ allowedPlacements: ['top', 'bottom'] })],
  })

  return (
    <div className="flex flex-col gap-8">
      <div></div>
      <div className="h-[100px] overflow-hidden">
        <Listbox value={selectedFruit} onChange={setSelectedFruit}>
          <Listbox.Button ref={reference} className="px-2 py-1 min-w-[120px] max-w-[240px] truncate">
            <span>{selectedFruit?.name || '请选择'}</span>
          </Listbox.Button>
          {createPortal(
            <Transition
              as={Fragment}
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="w-screen h-screen overflow-auto absolute top-0 bottom-0">
                <div
                  ref={floating}
                  className="bg-white rounded overflow-x-hidden overflow-y-auto max-w-[320px] max-h-[90vh]"
                  style={{
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                    width: 'max-content',
                  }}
                >
                  <Listbox.Options className="m-0 p-0 list-none">
                    {options.map((o) => (
                      <Listbox.Option
                        key={o.id}
                        className={({ active }) => `px-4 py-2 ${active ? 'bg-blue-500 text-white' : 'text-black'}`}
                        value={o}
                      >
                        {({ selected }) => (
                          <span
                            title={o.name}
                            className={`truncate w-full inline-block ${selected ? 'font-semibold' : 'font-normal'}`}
                          >
                            {o.name}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </div>
            </Transition>,
            document.body
          )}
        </Listbox>
      </div>
    </div>
  )
}
