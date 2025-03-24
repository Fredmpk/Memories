import AddCategory from "@/components/add-category";
import DeleteCategory from "@/components/delete-category";
import FloatingBackground from "@/components/floating-bg";
import NotificationSubscribe from "@/components/subscribe-notification";
import getCategories from "@/lib/utils/get-categories";
import getEmptyCategories from "@/lib/utils/get-empty-categories";
import Link from "next/link";

// In your page file
export const dynamic = "force-dynamic";

export default async function Home() {
  const categories = await getCategories();
  const emptyCategories = await getEmptyCategories();

  return (
    <FloatingBackground>
      <div>
        <h1 className="text-5xl flex justify-center p-4 font-bold">
          <p className="bg-black text-white rounded-2xl p-3 opacity-80">
            Erinnerungsbuch
          </p>
        </h1>
        <div className="grid grid-cols-2 gap-3 m-4">
          {categories && categories.length > 0 ? (
            categories.map((category) => {
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
        <DeleteCategory emptyCategories={emptyCategories} />
        <NotificationSubscribe />
      </div>
    </FloatingBackground>
  );
}
