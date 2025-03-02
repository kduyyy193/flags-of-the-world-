import { gamesMenu } from "@/contants";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-10 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="p-4">
          <h1 className="text-lg font-semibold mt-8">Flags Quiz Games</h1>
          <div className="mt-6">
            {gamesMenu.map((g, idx) => {
              return (
                <div key={idx} className="flex flex-col">
                  <Link
                    href={g.link}
                    className="text-center px-4 py-2 rounded-lg border border-blue-500"
                    style={{
                      borderColor: g.color,
                    }}
                  >
                    {g.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        © No Copyright
      </footer>
    </div>
  );
}
