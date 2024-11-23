import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchModels } from '../api/models';
import ModelCard from './ModelCard';
import FilterSidebar from './FilterSidebar';
import SearchBar from './SearchBar';

function ModelList({ favorites = false }) {
  const [filters, setFilters] = useState({
    type: [],
    language: [],
    specialization: [],
    minRating: 0
  });
  const [searchQuery, setSearchQuery] = useState('');

  const { data: models, isLoading, error } = useQuery(
    ['models', filters, searchQuery],
    () => fetchModels(filters, searchQuery)
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error loading models: {error.message}
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <div className="flex-1">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {models?.map(model => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModelList;