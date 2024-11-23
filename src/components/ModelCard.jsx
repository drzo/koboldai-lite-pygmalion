import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../hooks/useFavorites';

function ModelCard({ model }) {
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();

  const {
    id,
    name,
    description,
    rating,
    reviewCount,
    imageUrl,
    specializations
  } = model;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/model/${id}`}>
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{name}</h3>
          {user && (
            <button
              onClick={() => toggleFavorite(id)}
              className="text-yellow-400 hover:text-yellow-500"
            >
              <StarIcon 
                className={`h-6 w-6 ${isFavorite(id) ? 'fill-current' : 'stroke-current'}`} 
              />
            </button>
          )}
        </div>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {description}
        </p>
        <div className="mt-3 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({reviewCount} reviews)
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {specializations.map(spec => (
            <span
              key={spec}
              className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModelCard;