import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchModelById } from '../api/models';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import { useAuth } from '../contexts/AuthContext';
import ModelFeatures from './ModelFeatures';
import UsageExamples from './UsageExamples';

function ModelDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  
  const { data: model, isLoading, error } = useQuery(
    ['model', id],
    () => fetchModelById(id)
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
        Error loading model: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{model.name}</h1>
            <p className="text-gray-600 mt-2">{model.description}</p>
          </div>
          <img 
            src={model.imageUrl} 
            alt={model.name}
            className="w-32 h-32 object-cover rounded-lg"
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <ModelFeatures features={model.features} />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>
          <UsageExamples examples={model.examples} />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          <ReviewList reviews={model.reviews} />
          
          {user ? (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Write a Review</h3>
              <ReviewForm modelId={id} />
            </div>
          ) : (
            <p className="mt-6 text-gray-600">
              Please log in to write a review.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModelDetail;