import { images } from "./images";

export const generateProducts = () => {
  return images.map((image, i) => ({
    id: image.id,
    imageUrl: image.download_url,
    title: image.author,
    subtitle: `Category ${(i % 3) + 1}`,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  }));
};
