
import SearchBar from "./SearchBar";

function Hero({ onSearch }) {
  return (
    <section className="bg-linear-to-b from-indigo-50 to-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 font-semibold text-indigo-600">
          YOUR NEXT CAREER STARTS HERE
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
          Find Your Next
          <span className="block text-indigo-600">
            Opportunity
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
          Explore opportunities, discover companies, and find
          a role that matches your skills.
        </p>

        <div className="mt-10">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
}

export default Hero;
