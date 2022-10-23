import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styled, { css } from 'styled-components'

import { getFontSize, getPaddingY, getShadow, getTransition, themeVars } from '../../helpers/theme'
import { Size } from '../../helpers/types'
import { useSyncRef } from '../../hooks/core'
import { useDocSize } from '../../hooks/dom'
import ChevronDown from '../icons/chevron-down'

export type SelectOption<V> = { label: string; value: V }

export type SelectProps<T> = {
  size?: Size
  disabled?: boolean
  placeholder?: string
  options: SelectOption<T>[]
  defaultValue?: T
  value?: T
  onChange?: (value: T) => void
}

const dropdownMeta = {
  edgeGap: 24,
  triggerGap: 8,
}

const Trigger = styled.div<{ size: Size; disabled: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ size }) => `${getPaddingY(size)} 0.625rem`};
  border: 1px solid ${themeVars.borderColor};
  border-radius: ${themeVars.rounded};
  transition: ${getTransition()};
  cursor: pointer;
  min-width: ${({ size }) => (size == 'lg' ? 200 : size === 'md' ? 160 : 120)}px;

  .text {
    flex: auto;
    font-size: ${({ size }) => getFontSize(size)};
  }

  .icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    color: ${themeVars.borderColor};
  }

  ${({ disabled }) =>
    disabled
      ? css`
          cursor: not-allowed;
          background-color: ${themeVars.disabledBg};

          .text {
            color: ${themeVars.disabledText};
          }
        `
      : css`
          &:hover {
            border-color: ${themeVars.primary_500};
          }
        `}
`

const Dropdown = styled(motion.div)<{
  top?: number
  bottom?: number
  left: number
  width: number
}>`
  position: absolute;
  top: ${({ top }) => (top ? top + 'px' : undefined)};
  bottom: ${({ bottom }) => (bottom ? bottom + 'px' : undefined)};
  left: ${({ left }) => left + 'px'};
  z-index: 9;
  width: ${({ width }) => width + 'px'};
  max-width: ${({ width }) => width + 'px'};
  max-height: calc(100vh - ${2 * dropdownMeta.edgeGap}px);
  border-radius: ${themeVars.rounded};
  background-color: ${themeVars.white};
  box-shadow: ${getShadow()};
  transition: ${getTransition()};
  overflow: auto;
`

const DropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
`

const DropdownItem = styled.li<{ size: Size }>`
  padding: 0.5rem 0.625rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  font-size: ${({ size }) => getFontSize(size)};
  &:hover {
    background-color: ${themeVars.primary};
  }
`

export default function Select<T>(props: SelectProps<T>) {
  const { options, size = 'md', disabled = false, placeholder, defaultValue, value, onChange } = props
  const hasValue = Object.prototype.hasOwnProperty.call(props, 'value')

  const $trigger = useRef<HTMLInputElement>(null)
  const $dropdown = useRef<HTMLDivElement>(null)
  const $triggerRO = useRef<ResizeObserver>()
  const $dropdownRO = useRef<ResizeObserver>()

  const [isShowDropdown, setIsShowDropdown] = useState(false)
  const [triggerRect, setTriggerRect] = useState({ width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 })
  const [dropdownRect, setDropdownRect] = useState({ width: 0, height: 0 })

  const $triggerRect = useSyncRef(triggerRect)
  const $dropdownRect = useSyncRef(dropdownRect)

  const optionMap = useMemo(() => new Map(options.map((o) => [o.value, o])), [options])

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const triggerElement = $trigger.current
      if (!triggerElement?.contains(event.target as Node)) setIsShowDropdown(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  useEffect(() => {
    const triggerElement = $trigger.current
    if (!triggerElement) return
    const callback: ResizeObserverCallback = ([{ target }]) => {
      const rect = target.getBoundingClientRect()
      const triggerRect = $triggerRect.current
      if (
        triggerRect.width !== rect.width ||
        triggerRect.height !== rect.height ||
        triggerRect.top !== rect.top ||
        triggerRect.bottom !== rect.bottom ||
        triggerRect.right !== rect.right ||
        triggerRect.left !== rect.left
      )
        setTriggerRect({
          width: rect.width,
          height: rect.height,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
        })
    }
    $triggerRO.current = new ResizeObserver(callback)
    $triggerRO.current.observe(triggerElement)
    return () => {
      if ($triggerRO.current) {
        $triggerRO.current.disconnect()
        $triggerRO.current = undefined
      }
    }
  }, [$triggerRect])

  useEffect(() => {
    const callback: ResizeObserverCallback = ([{ contentRect }]) => {
      const dropdownRect = $dropdownRect.current
      if (dropdownRect.width !== contentRect.width || dropdownRect.height !== contentRect.height)
        setDropdownRect({ width: contentRect.width, height: contentRect.height })
    }
    $dropdownRO.current = new ResizeObserver(callback)
    return () => {
      if ($dropdownRO.current) {
        $dropdownRO.current.disconnect()
        $dropdownRO.current = undefined
      }
    }
  }, [$dropdownRect])

  useEffect(() => {
    const dropdownElement = $dropdown.current
    const observer = $dropdownRO.current
    if (dropdownElement && observer) observer.observe(dropdownElement, { box: 'border-box' })
  })

  const docSize = useDocSize()

  const dropdownNeedHeight = dropdownRect.height + dropdownMeta.triggerGap + dropdownMeta.edgeGap
  const topOverflow = docSize.height - triggerRect.top < dropdownNeedHeight
  const bottomOverflow = docSize.height - triggerRect.bottom < dropdownNeedHeight

  const verticalPos = {
    top: !bottomOverflow
      ? triggerRect.bottom + dropdownMeta.triggerGap
      : topOverflow
      ? (docSize.height - dropdownRect.height) / 2
      : undefined,
    bottom: bottomOverflow && !topOverflow ? docSize.height - triggerRect.top + dropdownMeta.triggerGap : undefined,
  }

  const [selectedValue, setSelectedValue] = useState(defaultValue)
  const selectedOption = useMemo(() => {
    let result
    if (hasValue && value !== undefined) result = optionMap.get(value)
    else if (selectedValue !== undefined) result = optionMap.get(selectedValue)
    return result
  }, [hasValue, optionMap, selectedValue, value])
  const selectedText = selectedOption ? selectedOption.label : placeholder

  const handleTrigger = () => {
    if (disabled) return
    setIsShowDropdown((pv) => !pv)
  }

  const handleItemClick = (option: SelectOption<T>) => {
    if (!hasValue) setSelectedValue(option.value)
    onChange && onChange(option.value)
  }

  return (
    <>
      <Trigger ref={$trigger} size={size} disabled={disabled} onClick={handleTrigger}>
        <span className="text">{selectedText}</span>
        <span className="icon">
          <ChevronDown />
        </span>
      </Trigger>
      {createPortal(
        <AnimatePresence>
          {isShowDropdown && (
            <Dropdown
              ref={$dropdown}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              top={verticalPos.top}
              bottom={verticalPos.bottom}
              left={triggerRect.left}
              width={triggerRect.width}
            >
              <DropdownList>
                {options.map((o, index) => {
                  const key = typeof o.value === 'number' || typeof o.value === 'string' ? o.value : index
                  return (
                    <DropdownItem key={key} title={o.label} size={size} onClick={() => handleItemClick(o)}>
                      {o.label}
                    </DropdownItem>
                  )
                })}
              </DropdownList>
            </Dropdown>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
