import { css } from '@emotion/react'
import { offset, useFloating } from '@floating-ui/react-dom-interactions'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { mergeRefs } from 'react-merge-refs'

import { getFontSize, getPaddingY, getShadow, getTransition, themeVars } from '../../helpers/theme'
import { Size } from '../../helpers/types'
import useOutsideClick from '../../hooks/dom'
import { ChevronDown } from '../icons'

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

export default function Select<T>(props: SelectProps<T>) {
  const { options, size = 'md', disabled = false, placeholder, defaultValue, value, onChange } = props
  const hasValue = Object.prototype.hasOwnProperty.call(props, 'value')

  const [isShowDropdown, setIsShowDropdown] = useState(false)
  const { x, y, reference, floating, strategy } = useFloating({
    open: isShowDropdown,
    onOpenChange: setIsShowDropdown,
    placement: 'bottom',
    middleware: [offset(8)],
  })

  const $trigger = useOutsideClick<HTMLDivElement>(() => setIsShowDropdown(false))

  const optionMap = useMemo(() => new Map(options.map((o) => [o.value, o])), [options])

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
      <button
        ref={mergeRefs([$trigger, reference])}
        css={css`
          display: flex;
          align-items: center;
          padding: ${`${getPaddingY(size)} 0.625rem`};
          background-color: ${themeVars.white};
          border: 1px solid ${themeVars.borderColor};
          border-radius: ${themeVars.rounded};
          transition: ${getTransition()};
          cursor: pointer;
          min-width: ${size == 'lg' ? 200 : size === 'md' ? 160 : 120}px;

          ${disabled
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
        `}
        onClick={handleTrigger}
      >
        <span
          css={css`
            flex: auto;
            font-size: ${getFontSize(size)};
          `}
        >
          {selectedText}
        </span>
        <span
          css={css`
            flex-shrink: 0;
            display: flex;
            align-items: center;
            color: ${themeVars.borderColor};
          `}
        >
          <ChevronDown />
        </span>
      </button>
      {createPortal(
        <AnimatePresence>
          {isShowDropdown && (
            <motion.div
              ref={floating}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              css={css`
                z-index: 9;
                position: ${strategy};
                top: ${y ?? 0}px;
                left: ${x ?? 0}px;
                width: max-content;
                border-radius: ${themeVars.rounded};
                background-color: ${themeVars.white};
                box-shadow: ${getShadow()};
                transition: ${getTransition()};
                overflow: auto;
              `}
            >
              <ul
                css={css`
                  display: flex;
                  flex-direction: column;
                  list-style: none;
                  padding: 0;
                  margin: 0;
                `}
              >
                {options.map((o, index) => {
                  const key = typeof o.value === 'number' || typeof o.value === 'string' ? o.value : index
                  return (
                    <li
                      key={key}
                      css={css`
                        padding: 0.5rem 0.625rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        cursor: pointer;
                        font-size: ${getFontSize(size)};
                        &:hover {
                          background-color: ${themeVars.primary};
                        }
                      `}
                      title={o.label}
                      onClick={() => handleItemClick(o)}
                    >
                      {o.label}
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
