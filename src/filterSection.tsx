import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FilterSectionProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    count?: string;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ label, options, value, onChange, count }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 border rounded-lg bg-white hover:bg-gray-50 flex items-center justify-between text-left"
            >
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{label}</span>
                    {count && <span className="text-xs text-gray-500">({count})</span>}
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg">
                    <div className="p-2">
                        <select
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-full p-2 border rounded-md text-sm"
                        >
                            <option value="">All {label}</option>
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};
