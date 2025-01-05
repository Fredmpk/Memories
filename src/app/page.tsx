import AddCategory from "@/components/add-category";
import getCategories from "@/lib/utils/fetch-categories";
import Link from "next/link";

// In your page file
export const dynamic = "force-dynamic";

export default async function Home() {
  const categories = await getCategories();
  if (categories.length === 0) {
    console.log("No categories found");
    return (
      <div className="bg-[url('/kollage-mama.jpg')] min-h-screen w-full animate-float">
        <h1 className="text-5xl flex justify-center p-4 font-bold">
          <p className="bg-zinc-50 rounded-2xl p-3 opacity-80">
            Erinnerungsbuch
          </p>
        </h1>
        <div className="grid grid-cols-2 gap-3 m-4">
          <p>No categorys found</p>
          <AddCategory />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[url('/kollage-mama.jpg')] min-h-screen w-full animate-float">
      <h1 className="text-5xl flex justify-center p-4 font-bold">
        <p className="bg-zinc-50 rounded-2xl p-3 opacity-80">Erinnerungsbuch</p>
      </h1>
      <div className="grid grid-cols-2 gap-3 m-4">
        {categories.map((category) => {
          console.log("Category:", category);
          return (
            <Link
              href={`/category/${category.id}`}
              key={category.id}
              className="p-3 bg-zinc-100 rounded-xl text-4xl opacity-80 flex justify-center"
            >
              <p className="">{category.name}</p>
            </Link>
          );
        })}
        <AddCategory />
      </div>
    </div>
  );
}
