import { useEffect } from 'react';
import { useRouter } from 'next/router';

const OldPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Perform client-side navigation to a new page
    router.replace('/demo/page_1'); // Using replace so the user can't go back to the old page
  }, [router]);

  return null; // Optionally return null or a loading message while redirecting
};

export default OldPage;
