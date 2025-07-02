import cytoscape from 'cytoscape';
import React, { useEffect, useRef } from 'react';

interface GraphViewProps {
    elements: cytoscape.ElementDefinition[];
}

const GraphView: React.FC<GraphViewProps> = ({ elements }) => {
    const cyContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cyContainer.current) {
            const cy = cytoscape({
                container: cyContainer.current,
                elements,
                style: [
                    {
                        selector: 'node',
                        style: {
                            'background-color': '#666',
                            'label': 'data(id)'
                        }
                    },
                    {
                        selector: 'edge',
                        style: {
                            'width': 3,
                            'line-color': '#ccc',
                            'target-arrow-color': '#ccc',
                            'target-arrow-shape': 'triangle'
                        }
                    }
                ],
                layout: {
                    name: 'grid',
                    rows: 1
                }
            });
        }
    }, [elements]);

    return <div ref={cyContainer} style={{ width: '100%', height: '600px' }} />;
};

export default GraphView;
