"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FilterType = 'all' | 'active' | 'completed';

interface FilterTabsProps {
  currentFilter: FilterType;
  onSetFilter: (filter: FilterType) => void;
}

export function FilterTabs({ currentFilter, onSetFilter }: FilterTabsProps) {
  return (
    <Tabs value={currentFilter} onValueChange={(value) => onSetFilter(value as FilterType)} className="mb-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
