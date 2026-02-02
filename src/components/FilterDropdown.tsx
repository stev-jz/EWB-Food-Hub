'use client';
import { Filters } from './types'

interface FilterDropdownProps {
    category: keyof Filters
    label: string
    options: (string | number)[]
    displayTransform?: (val: string | number) => string
    isOpen: boolean
    filters: Filters
    onToggle: (category: keyof Filters, value: string | number) => void
    onToggleDropdown: (dropdown: string) => void
}

export default function FilterDropdown({
    category,
    label,
    options,
    displayTransform = (val: string | number) => String(val),
    isOpen,
    filters,
    onToggle,
    onToggleDropdown
}: FilterDropdownProps) {
    const count = (filters[category] as (string | number)[]).length

    return (
        <div className="relative">
            <button
                onClick={() => onToggleDropdown(category)}
                className={`flex items-center gap-1.5 px-2 py-1 text-xs border border-black rounded transition-colors cursor-pointer ${count > 0
                    ? 'bg-blue-900 text-white border-blue-900'
                    : 'bg-white text-black border-black hover:bg-gray-100'
                    }`}
            >
                <span>{label}</span>
                <svg
                    className={`w-3 h-3 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-black rounded shadow-lg z-10 max-h-48 overflow-y-auto">
                    <div className="p-1.5 space-y-0.5">
                        {options.map(option => {
                            const isSelected = (filters[category] as (string | number)[]).includes(option)
                            return (
                                <label key={option} className="flex items-center gap-1.5 p-1.5 hover:bg-gray-100 rounded cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => onToggle(category, option)}
                                        className="rounded border-black text-blue-900 focus:ring-blue-900"
                                    />
                                    <span className="text-xs text-black">
                                        {displayTransform(option)}
                                    </span>
                                </label>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
