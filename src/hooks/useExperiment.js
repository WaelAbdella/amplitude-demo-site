import { useState, useEffect } from 'react';
import { getExperimentVariant, isExperimentActive } from '../utils/amplitude';

export const useExperiment = (experimentKey) => {
  const [variant, setVariant] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Check if experiment is active
    const active = isExperimentActive(experimentKey);
    setIsActive(active);

    if (active) {
      // Get the variant if experiment is active
      const experimentVariant = getExperimentVariant(experimentKey);
      setVariant(experimentVariant);
    }

    // Set up an interval to check for experiment updates
    const interval = setInterval(() => {
      const currentActive = isExperimentActive(experimentKey);
      if (currentActive !== isActive) {
        setIsActive(currentActive);
        if (currentActive) {
          const currentVariant = getExperimentVariant(experimentKey);
          setVariant(currentVariant);
        }
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [experimentKey]);

  return {
    variant,
    isActive,
    // Helper method to check if current variant matches a specific value
    isVariant: (value) => variant === value,
  };
}; 