export default function Skeleton() {
  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 p-6">
      {[...Array(5)].map((movie, index) => (
        <li key={index} className="relative animate-pulse">
          <div className="relative w-full aspect-video rounded-md overflow-hidden bg-gray-200"></div>
          <p className="mt-2 h-4 w-1/2 rounded-lg bg-gray-200"></p>
          <p className="mt-2 block h-4 rounded-lg bg-gray-200 text-sm font-medium"></p>
          <p className="mt-2 block h-4 rounded-lg bg-gray-200 text-sm font-medium"></p>
        </li>
      ))}
    </ul>
  );
}
