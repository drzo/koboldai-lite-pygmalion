import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const filterCategories = {
  type: ['Conversational', 'Task-Specific', 'Creative', 'Academic'],
  language: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'],
  specialization: ['General', 'Medical', 'Legal', 'Technical', 'Creative Writing']
};

function FilterSidebar({ filters, setFilters, mobileOpen, setMobileOpen }) {
  const handleFilterChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleRatingChange = (value) => {
    setFilters(prev => ({
      ...prev,
      minRating: value
    }));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          
          {Object.entries(filterCategories).map(([category, options]) => (
            <div key={category} className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2 capitalize">
                {category}
              </h3>
              <div className="space-y-2">
                {options.map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters[category].includes(option)}
                      onChange={() => handleFilterChange(category, option)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Minimum Rating
            </h3>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={filters.minRating}
              onChange={(e) => handleRatingChange(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-600 mt-1">
              {filters.minRating} stars or higher
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Transition.Root show={mobileOpen} as={Fragment}>
        <Dialog 
          as="div" 
          className="relative z-40 md:hidden" 
          onClose={setMobileOpen}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setMobileOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="p-4">
                  {/* Mobile filter content - same as desktop but styled for mobile */}
                  {/* ... */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default FilterSidebar;