'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Plus, Trash2 } from 'lucide-react';

interface Category {
  name: string;
  prompt: string;
  storageKey: string;
}

interface ToolboxProps {
  title: string;
  description: string;
  categories: Category[];
}

function ToolboxCategory({ category }: { category: Category }) {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedItems = localStorage.getItem(category.storageKey);
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error(`Failed to load items for ${category.storageKey} from localStorage`, error);
    }
  }, [category.storageKey]);

  const handleAddItem = () => {
    if (newItem.trim()) {
      try {
        const updatedItems = [...items, newItem.trim()];
        setItems(updatedItems);
        localStorage.setItem(category.storageKey, JSON.stringify(updatedItems));
        setNewItem('');
      } catch (error) {
        console.error(`Failed to save item for ${category.storageKey} to localStorage`, error);
      }
    }
  };

  const handleDeleteItem = (indexToDelete: number) => {
    try {
      const updatedItems = items.filter((_, index) => index !== indexToDelete);
      setItems(updatedItems);
      localStorage.setItem(category.storageKey, JSON.stringify(updatedItems));
    } catch (error) {
      console.error(`Failed to delete item for ${category.storageKey} from localStorage`, error);
    }
  };
  
  if (!isMounted) {
    return null; // Don't render on the server
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{category.prompt}</p>
      <div className="flex gap-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Añade una nueva estrategia..."
          onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
        />
        <Button onClick={handleAddItem} size="icon" aria-label="Añadir estrategia">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center justify-between gap-2 p-2 rounded-md bg-muted/50 text-sm">
            <span>{item}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => handleDeleteItem(index)}
              aria-label={`Eliminar ${item}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
         {items.length === 0 && (
            <p className="text-xs text-center text-muted-foreground py-4">Aún no has añadido ninguna estrategia a esta categoría.</p>
         )}
      </ul>
    </div>
  );
}


export function Toolbox({ title, description, categories }: ToolboxProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="multiple" className="w-full">
                    {categories.map((category) => (
                        <AccordionItem value={category.storageKey} key={category.storageKey}>
                            <AccordionTrigger className="text-base font-semibold">{category.name}</AccordionTrigger>
                            <AccordionContent>
                                <ToolboxCategory category={category} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}
