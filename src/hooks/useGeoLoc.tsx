import { useState, useEffect } from 'react';

export const useGeoLoc = (): [
  GeolocationPosition | undefined,
  GeolocationPositionError | undefined
] => {
  const [position, setPosition] = useState<GeolocationPosition>();
  const [error, setError] = useState<GeolocationPositionError>();

  useEffect(() => {
    let canceled = false;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!canceled) {
          setPosition(position);
        }
      },
      (error) => {
        if (!canceled) {
          setError(error);
        }
      }
    );

    return () => {
      canceled = true;
    };
  }, []);

  return [position, error];
};
