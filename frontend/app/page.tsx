import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">
        Play. Win. Give Back.
      </h1>

      <p className="text-gray-400 mb-6">
        Track your golf scores, win monthly prizes & support charity.
      </p>

      <Link href="/register">
        <button className="bg-green-500 px-6 py-3 rounded-lg">
          Get Started
        </button>
      </Link>
    </div>
  );
}