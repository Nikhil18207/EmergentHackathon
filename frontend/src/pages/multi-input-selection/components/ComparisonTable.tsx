import { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import { InputMethod } from '../types';

interface ComparisonTableProps {
    methods: InputMethod[];
}

const ComparisonTable = ({ methods }: ComparisonTableProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="mt-16">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 glass border border-border rounded-lg hover:border-primary/50 animate-spring"
                aria-expanded={isExpanded}
                aria-label="Toggle comparison table"
            >
                <div className="flex items-center gap-3">
                    <Icon name="Table" size={20} className="text-primary" />
                    <span className="font-heading font-semibold text-lg text-foreground">
                        Compare All Methods
                    </span>
                </div>
                <Icon
                    name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                    size={20}
                    className="text-muted-foreground"
                />
            </button>

            {isExpanded && (
                <div className="mt-4 glass border border-border rounded-lg overflow-hidden animate-slide-in-from-top">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/20 border-b border-border">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-heading font-semibold text-foreground">
                                        Method
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-heading font-semibold text-foreground">
                                        Time
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-heading font-semibold text-foreground">
                                        Credits
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-heading font-semibold text-foreground">
                                        Difficulty
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-heading font-semibold text-foreground">
                                        Best For
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {methods.map((method, index) => (
                                    <tr
                                        key={method.id}
                                        className={`
                      border-b border-border last:border-b-0
                      hover:bg-muted/10 animate-spring
                      ${index % 2 === 0 ? 'bg-transparent' : 'bg-muted/5'}
                    `}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                                    <Icon name={method.icon} size={20} className="text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-body font-medium text-foreground">
                                                        {method.name}
                                                    </div>
                                                    {method.isPopular && (
                                                        <span className="text-xs font-caption text-primary">
                                                            Most Popular
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Icon name="Clock" size={16} className="text-muted-foreground" />
                                                <span className="text-sm font-caption text-foreground">
                                                    {method.estimatedTime}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Icon name="Coins" size={16} className="text-accent" />
                                                <span className="text-sm font-data font-semibold text-accent">
                                                    {method.creditCost}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`
                        inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium
                        ${method.difficulty === 'beginner' ? 'bg-success/20 text-success' : ''}
                        ${method.difficulty === 'intermediate' ? 'bg-warning/20 text-warning' : ''}
                        ${method.difficulty === 'advanced' ? 'bg-error/20 text-error' : ''}
                      `}>
                                                {method.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-caption text-muted-foreground">
                                                {method.features[0]}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComparisonTable;