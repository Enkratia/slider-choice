import image1 from "../../../public/next.svg";
import image2 from "../../../public/next.svg";
import image3 from "../../../public/next.svg";
import image4 from "../../../public/next.svg";

export const images: string[] = [image1, image2, image3, image4];

const imageByIndex = (index: number): string => images[index % images.length];

export default imageByIndex;
