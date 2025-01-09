import AddCategory from "@/components/add-category";
import getCategories from "@/lib/utils/fetch-categories";
import Link from "next/link";

// In your page file
export const dynamic = "force-dynamic";

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="bg-[url('/kollage-mama.jpeg')] min-h-screen w-full animate-float">
      <h1 className="text-5xl flex justify-center p-4 font-bold">
        <p className="bg-black text-white rounded-2xl p-3 opacity-80">
          Erinnerungsbuch
        </p>
      </h1>
      <div className="grid grid-cols-2 gap-3 m-4">
        {categories && categories.length > 0 ? (
          categories.map((category) => {
            console.log("Category:", category);
            return (
              <Link
                href={`/category/${category.id}`}
                key={category.id}
                className="p-3 bg-black text-white rounded-xl text-xl opacity-80 flex justify-center"
              >
                <p className="overflow-hidden whitespace-normal break-words text-center">
                  {category.name}
                </p>
              </Link>
            );
          })
        ) : (
          <div>no categories found</div>
        )}
        <AddCategory />
      </div>
    </div>
  );
}
