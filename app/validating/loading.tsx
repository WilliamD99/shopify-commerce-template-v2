export default function Loading() {
  return (
    <>
      <div
        id="validating"
        className="loading mt-20 flex flex-col items-center justify-center space-y-8"
      >
        <p className="text-lg font-semibold">Validating, please don't close this window...</p>
        <span className="loader h-10 w-10 border-black" />
      </div>
    </>
  );
}
