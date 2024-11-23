import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { 
  getFavorites, 
  addToFavorites, 
  removeFromFavorites 
} from '../api/favorites';

export function useFavorites() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useQuery(
    ['favorites', user?.uid],
    () => getFavorites(user.uid),
    {
      enabled: !!user
    }
  );

  const { mutate: toggleFavorite } = useMutation(
    async (modelId) => {
      const isFavorited = favorites.includes(modelId);
      if (isFavorited) {
        await removeFromFavorites(user.uid, modelId);
      } else {
        await addToFavorites(user.uid, modelId);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['favorites', user?.uid]);
      }
    }
  );

  const isFavorite = (modelId) => favorites.includes(modelId);

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
}