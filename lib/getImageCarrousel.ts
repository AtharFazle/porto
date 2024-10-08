import path from "path";
import fs from "fs";

export async function getImage() {
  const carrouselDirectory = path.join(
    process.cwd(),
    "public",
    "static",
    "carrousel"
  );

  const imageFiles = fs.readdirSync(carrouselDirectory);
  const images = imageFiles.map((file) => `/static/carrousel/${file}`);
  return images;
}
