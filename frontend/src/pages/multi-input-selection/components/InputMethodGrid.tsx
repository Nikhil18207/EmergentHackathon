import { useState } from 'react';
import InputMethodCard from './InputMethodCard';
import { InputMethodGridProps } from '../types';

const InputMethodGrid = ({ methods, onMethodSelect }: InputMethodGridProps) => {
    const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methods.map((method) => (
                <InputMethodCard
                    key={method.id}
                    method={method}
                    onSelect={onMethodSelect}
                    isHovered={hoveredMethod === method.id}
                    onHover={setHoveredMethod}
                />
            ))}
        </div>
    );
};

export default InputMethodGrid;