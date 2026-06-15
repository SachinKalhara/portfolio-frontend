import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // දැනට ඉන්න පිටුවේ URL එක (pathname) ලබාගැනීම
  const { pathname } = useLocation();

  useEffect(() => {
    // Path එක වෙනස් වෙන හැමවෙලාවෙම (පිටුවක් මාරු වෙද්දි) Scroll එක 0,0 (උඩටම) ගෙනියන්න
    window.scrollTo(0, 0);
  }, [pathname]);

  // මේ Component එකෙන් මුකුත් පෙන්වන්නේ නැති නිසා null return කරනවා
  return null;
};

export default ScrollToTop;