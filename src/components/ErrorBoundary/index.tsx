import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error: any = useRouteError();
  return (
    <div>
      <p>ErrorBoundary...</p>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorBoundary;
