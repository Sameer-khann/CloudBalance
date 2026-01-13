function NotFound() {
  return (
    <>
    <div className="flex items-center justify-center flex-col gap-5 h-100">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-3xl font-semibold">Not Found</h2>
      <h3 className="text-lg text-gray-500 text-center">
        The page you are looking for doesn't exist on this website.
      </h3>
    </div>
    </>
  );
}

export default NotFound;
