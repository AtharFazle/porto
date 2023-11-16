import qs from "qs"

export function Query (slug:string) {
    const query = qs.stringify(
      {
        where: {
          slug: {
            equals: slug
          },
        },
        depth: 1,
        locale: "en",
      },
      { addQueryPrefix: true }
    );
    return query;
  }