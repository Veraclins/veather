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
      <NotFound />
      <h1 className="mt-4 text-center">Something&apos;s missing</h1>
      <p className="text-center">
        This page is missing or you assembled the link incorrectly.
      </p>
      <button
        onClick={gotoHomePage}
        className="bg-blue p-2-5 px-3 mt-3 text-white"
        data-testid="goto-home"
      >
        Let's take you home
      </button>
    </div>
  );
};

export default NotFoundPage;
