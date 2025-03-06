import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loadImages, refreshImages } from './GalleryState';

const GalleryContainer = () => {
  const dispatch = useDispatch();

  // Select state from Redux store
  const isLoading = useSelector((state) => state.gallery.isLoading);
  const images = useSelector((state) => state.gallery.images);

  // Run `loadImages()` when the component mounts
  useEffect(() => {
    dispatch(loadImages());
  }, [dispatch]);

  return (
    <GalleryScreen 
      isLoading={isLoading} 
      images={images} 
      loadImages={() => dispatch(loadImages())} 
      refreshImages={() => dispatch(refreshImages())} 
    />
  );
};

export default GalleryContainer;
