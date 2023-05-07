import { useRouteError } from "react-router-dom"

const ErrorComponent = () => {
  const error = useRouteError() as any;
  return (
    <div className="container text-center p-2 p-lg-5">
      <h1 className="mb-4">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorComponent;
