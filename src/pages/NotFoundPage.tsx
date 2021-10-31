import React from 'react';
import { ReactComponent as NotFound } from 'assets/404.svg';
import { useHistory } from 'react-router';

const NotFoundPage: React.FC = () => {
  const history = useHistory();

  const gotoHomePage = () => {
    history.push('/');
  };

  return (
    <div className="contained">
      <NotFound className="max-w-90" />
      <h1 className="mt-4 text-center">Something&apos;s missing</h1>
      <p className="text-center">
        This page is missing or you assembled the link incorrectly.
      </p>
      <button
        onClick={gotoHomePage}
        className="text-no-transform p-2-5 px-3 mt-3 bg-mast-theme-deep text-white"
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default NotFoundPage;
