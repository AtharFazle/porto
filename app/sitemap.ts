import { BASE_URL, CMS_URL, RevalidateTime } from "@/lib/constant";
// import { responseArticles } from "@/type/Payload";

export default async function sitemap() {
  // const url = `${CMS_URL}/api/articles?&draft=false&depth=1&locale=en`;
  // const articles = await fetch(url, {
  //   next: {
  //     revalidate: RevalidateTime,
  //   },
  // });
  // const dataArticles: responseArticles = await articles.json();
  // const articlesDocs = dataArticles.docs.map((article) => ({
  //   url: `${BASE_URL}/article/${article.slug}`,
  //   lastModified: article.updatedAt,
  // }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/article`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/project`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/experience`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
    },
    // ...articlesDocs,
  ];
}
