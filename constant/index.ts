//for navigation
export const navigation = [
    {
      label: "0",
      title: "Home",
      route: "/",
    },
    {
      label: "1",
      title: "about",
      route: "/about",
    },
  ];


 // Define the interface for a product

 // Define the interface for a product
interface ProductProps {
  id: string;
  image: string;
  name: string;
  isPopular: boolean;
  isShown: boolean;
  description?: string;
  price: number;
}

// Define the interface for a category
interface CategoryProps {
  id: string;
  image: string;
  name: string;
  products: ProductProps[];
}

// Define the array of categories with nested products
export const categories: CategoryProps[] = [
  {
    id: "1",
    image: "https://5.imimg.com/data5/YL/RI/OR/SELLER-95604177/stationeries-500x500-png-500x500.png",
    name: "Stationary",
    products: [
      {
        id: "1",
        image: "https://example.com/stationary1.jpg",
        name: "Notebook",
        isPopular: true,
        isShown: true,
        price: 10
      },
      {
        id: "2",
        image: "https://example.com/stationary2.jpg",
        name: "Pencil",
        isPopular: false,
        isShown: false,
        price: 5
      },
      {
        id: "3",
        image: "https://example.com/stationary3.jpg",
        name: "Eraser",
        isPopular: false,
        isShown: true,
        price: 3
      },
      {
        id: "4",
        image: "https://example.com/stationary4.jpg",
        name: "Ruler",
        isPopular: false,
        isShown: true,
        price: 4
      },
      {
        id: "5",
        image: "https://example.com/stationary5.jpg",
        name: "Markers",
        isPopular: false,
        isShown: true,
        price: 8
      },
      {
        id: "6",
        image: "https://example.com/stationary6.jpg",
        name: "Sticky-Notes",
        isPopular: false,
        isShown: true,
        price: 6
      }
    ],
  },
  {
    id: "2",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/6/313804451/XJ/BS/UO/117482125/super-king-truck-toy.jpg",
    name: "Truck",
    products: [
      {
        id: "7",
        image: "https://example.com/truck1.jpg",
        name: "Fire-Truck",
        isPopular: true,
        isShown: true,
        price: 25,
        description: "This Fire Truck toy comes equipped with lights and sounds, making it perfect for imaginative play. It's made of durable plastic and is suitable for children ages 3 and up."
      },
      {
        id: "8",
        image: "https://example.com/truck2.jpg",
        name: "Dump-Truck",
        isPopular: false,
        isShown: false,
        price: 20
      },
      {
        id: "9",
        image: "https://example.com/truck3.jpg",
        name: "Cement-Mixer",
        isPopular: false,
        isShown: true,
        price: 30
      },
      {
        id: "10",
        image: "https://example.com/truck4.jpg",
        name: "Tow-Truck",
        isPopular: false,
        isShown: true,
        price: 22
      },
      {
        id: "11",
        image: "https://example.com/truck5.jpg",
        name: "Garbage-Truck",
        isPopular: false,
        isShown: true,
        price: 18
      },
      {
        id: "12",
        image: "https://example.com/truck6.jpg",
        name: "Delivery-Truck",
        isPopular: false,
        isShown: true,
        price: 28
      }
    ],
  },
  {
    id: "3",
    image: "https://m.media-amazon.com/images/I/71R4Lkp9FJL.jpg",
    name: "Dolls",
    products: [
      {
        id: "13",
        image: "https://example.com/doll1.jpg",
        name: "Barbie",
        isPopular: true,
        isShown: false,
        price: 30,
        description: "Barbie doll is a fashion doll manufactured by the American toy company Mattel, Inc. and launched in March 1959. American businesswoman Ruth Handler is credited with the creation of the doll using a German doll called Bild Lilli as her inspiration."
      },
      {
        id: "14",
        image: "https://example.com/doll2.jpg",
        name: "Baby-Doll",
        isPopular: false,
        isShown: true,
        price: 25,
        description: "Barbie doll is a fashion doll manufactured by the American toy company Mattel, Inc. and launched in March 1959. American businesswoman Ruth Handler is credited with the creation of the doll using a German doll called Bild Lilli as her inspiration."
      },
      {
        id: "15",
        image: "https://example.com/doll3.jpg",
        name: "American-Girl-Doll",
        isPopular: true,
        isShown: true,
        price: 40,
        description: "Barbie doll is a fashion doll manufactured by the American toy company Mattel, Inc. and launched in March 1959. American businesswoman Ruth Handler is credited with the creation of the doll using a German doll called Bild Lilli as her inspiration."
      },
      {
        id: "16",
        image: "https://example.com/doll4.jpg",
        name: "Ken-Doll",
        isPopular: false,
        isShown: true,
        price: 20,
        description: "Barbie doll is a fashion doll manufactured by the American toy company Mattel, Inc. and launched in March 1959. American businesswoman Ruth Handler is credited with the creation of the doll using a German doll called Bild Lilli as her inspiration."
      },
      {
        id: "17",
        image: "https://example.com/doll5.jpg",
        name: "Rag-Doll",
        isPopular: false,
        isShown: true,
        price: 15,
        description: "Barbie doll is a fashion doll manufactured by the American toy company Mattel, Inc. and launched in March 1959. American businesswoman Ruth Handler is credited with the creation of the doll using a German doll called Bild Lilli as her inspiration."
      },
      {
        id: "18",
        image: "https://example.com/doll6.jpg",
        name: "Fashion-Doll",
        isPopular: false,
        isShown: true,
        price: 35,
        description: "Barbie doll is a fashion doll manufactured by the American toy company Mattel, Inc. and launched in March 1959. American businesswoman Ruth Handler is credited with the creation of the doll using a German doll called Bild Lilli as her inspiration."
      }
    ],
  },
  {
    id: "4",
    image: "https://m.media-amazon.com/images/I/61k4AotokRL._AC_UF1000,1000_QL80_.jpg",
    name: "Blocks",
    products: [
      {
        id: "19",
        image: "https://example.com/blocks1.jpg",
        name: "Lego-Set",
        isPopular: true,
        isShown: true,
        price: 50
      },
      {
        id: "20",
        image: "https://example.com/blocks2.jpg",
        name: "Mega-Bloks",
        isPopular: false,
        isShown: false,
        price: 40
      },
      {
        id: "21",
        image: "https://example.com/blocks3.jpg",
        name: "Wooden-Blocks",
        isPopular: false,
        isShown: true,
        price: 25
      },
      {
        id: "22",
        image: "https://example.com/blocks4.jpg",
        name: "Magnetic-Blocks",
        isPopular: true,
        isShown: true,
        price: 30
      },
      {
        id: "23",
        image: "https://example.com/blocks5.jpg",
        name: "Building-Blocks",
        isPopular: false,
        isShown: true,
        price: 35
      },
      {
        id: "24",
        image: "https://example.com/blocks6.jpg",
        name: "Foam-Blocks",
        isPopular: false,
        isShown: true,
        price: 20
      }
    ],
  },
  {
    id: "5",
    image: "https://m.media-amazon.com/images/I/61k4AotokRL._AC_UF1000,1000_QL80_.jpg",
    name: "Super-Heroes",
    products: [
      {
        id: "25",
        image: "https://example.com/superhero1.jpg",
        name: "Spiderman",
        isPopular: true,
        isShown: true,
        price: 20,
        description: "The LEGO set is a classic toy that allows children to build various structures, vehicles, and characters using colorful plastic bricks. It encourages creativity, problem-solving skills, and fine motor development."
      },
      {
        id: "26",
        image: "https://example.com/superhero2.jpg",
        name: "Batman",
        isPopular: false,
        isShown: false,
        price: 18,
        description: "The LEGO set is a classic toy that allows children to build various structures, vehicles, and characters using colorful plastic bricks. It encourages creativity, problem-solving skills, and fine motor development."
      },
      {
        id: "27",
        image: "https://example.com/superhero3.jpg",
        name: "Ironman",
        isPopular: false,
        isShown: true,
        price: 22,
        description: "The LEGO set is a classic toy that allows children to build various structures, vehicles, and characters using colorful plastic bricks. It encourages creativity, problem-solving skills, and fine motor development."
      },
      {
        id: "28",
        image: "https://example.com/superhero4.jpg",
        name: "Wonder-Woman",
        isPopular: true,
        isShown: true,
        price: 25,
        description: "The LEGO set is a classic toy that allows children to build various structures, vehicles, and characters using colorful plastic bricks. It encourages creativity, problem-solving skills, and fine motor development."
      },
      {
        id: "29",
        image: "https://example.com/superhero5.jpg",
        name: "Captain-America",
        isPopular: false,
        isShown: true,
        price: 21,
        description: "The LEGO set is a classic toy that allows children to build various structures, vehicles, and characters using colorful plastic bricks. It encourages creativity, problem-solving skills, and fine motor development."
      },
      {
        id: "30",
        image: "https://example.com/superhero6.jpg",
        name: "Superman",
        isPopular: false,
        isShown: true,
        price: 23,
        description: "The LEGO set is a classic toy that allows children to build various structures, vehicles, and characters using colorful plastic bricks. It encourages creativity, problem-solving skills, and fine motor development."
      }
    ],
  },
];
