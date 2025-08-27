import { useState, useEffect, useCallback } from 'react';

interface ScrollData {
  scrollDirection: 'up' | 'down' | null;
  scrollY: number;
  isAtTop: boolean;
}

/**
 * Custom hook to detect scroll direction and position
 * @param threshold - Minimum scroll distance to trigger direction change (default: 10px)
 * @returns ScrollData object with scroll direction, position, and top status
 */
export function useScrollDirection(threshold = 10): ScrollData {
  const [scrollData, setScrollData] = useState<ScrollData>({
    scrollDirection: null,
    scrollY: 0,
    isAtTop: true,
  });
  
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const updateScrollDirection = useCallback(() => {
    const scrollY = window.scrollY;
    
    // Determine if we're at the top
    const isAtTop = scrollY < 10;
    
    // Only update direction if scroll difference exceeds threshold
    if (Math.abs(scrollY - lastScrollY) < threshold && !isAtTop) {
      return;
    }
    
    const direction = scrollY > lastScrollY ? 'down' : 'up';
    
    setScrollData({
      scrollDirection: direction,
      scrollY,
      isAtTop,
    });
    
    setLastScrollY(scrollY);
  }, [lastScrollY, threshold]);
  
  useEffect(() => {
    // Set initial scroll position
    const initialScrollY = window.scrollY;
    setLastScrollY(initialScrollY);
    setScrollData({
      scrollDirection: null,
      scrollY: initialScrollY,
      isAtTop: initialScrollY < 10,
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', updateScrollDirection, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [updateScrollDirection]);
  
  return scrollData;
}
