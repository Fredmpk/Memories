import Image from "next/image";
import Link from "next/link";

const categories = ["Flüche", "Biologie", "Natur", "Spazieren", "Sprache"];

export default function Home() {
  return (
    <div className="bg-[url('/kollage-mama.jpg')] min-h-screen w-full animate-float">
      <h1 className="text-5xl flex justify-center p-4 font-bold">
        <p className="bg-zinc-50 rounded-2xl p-3 opacity-80">Erinnerungsbuch</p>
      </h1>
      <div className="grid grid-cols-2 gap-3 m-4">
        {categories.map((category) => (
          <Link
            href={`/category/${category
              .toLowerCase()
              .replace(/ö/g, "oe")
              .replace(/ü/g, "ue")
              .replace(/ä/g, "ae")}}`}
            className="p-3 bg-zinc-100 rounded-xl text-4xl opacity-80 flex justify-center"
          >
            <p className="">{category}</p>
          </Link>
        ))}
        <div className="p-3 bg-zinc-100 rounded-xl text-2xl opacity-80 flex justify-center font-bold">
          <p className="p-0">Hinzufügen</p>
        </div>
      </div>
    </div>
  );
}
