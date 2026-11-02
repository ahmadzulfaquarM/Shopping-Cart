import fashion from "../assets/images-optimized/categories/fashion.webp";
import electronics from "../assets/images-optimized/categories/electronics.webp";
import shoes from "../assets/images-optimized/categories/shoes.webp";
import beauty from "../assets/images-optimized/categories/beauty.webp";
import furniture from "../assets/images-optimized/categories/furniture.webp";
import sports from "../assets/images-optimized/categories/sports.webp";

const categories = [
  {
    id: 1,
    name: "Fashion",
    image: fashion,
    productCount: 120,
    slug: "fashion",
  },
  {
    id: 2,
    name: "Electronics",
    image: electronics,
    productCount: 96,
    slug: "electronics",
  },
  {
    id: 3,
    name: "Shoes",
    image: shoes,
    productCount: 84,
    slug: "shoes",
  },
  {
    id: 4,
    name: "Beauty",
    image: beauty,
    productCount: 72,
    slug: "beauty",
  },
  {
    id: 5,
    name: "Furniture",
    image: furniture,
    productCount: 58,
    slug: "furniture",
  },
  {
    id: 6,
    name: "Sports",
    image: sports,
    productCount: 91,
    slug: "sports",
  },
];

export default categories;