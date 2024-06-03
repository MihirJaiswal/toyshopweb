//for navigation
export const navigation = [
    {
      label: "0",
      title: "Home",
      route: "/",
    },
    {
      label: "1",
      title: "Events",
      route: "/events",
    },
    {
      label: "2",
      title: "Team",
      route: "/team",
    },
    {
      label: "3",
      title: "Contact",
      route: "/contact",
    },
    
  ];


  interface ToyProps {
    image: string;
    name: string;
  }
  
  export const toyArray: ToyProps[] = [
    { image: "https://m.media-amazon.com/images/I/51DPmWAEDpL.jpg", name: "Spiderman" },
    { image: "https://images-cdn.ubuy.co.in/64e6c3f7ae0c047bce596027-batman-12-inch-rebirth-batman-action.jpg", name: "Batman" },
    { image: "https://images-cdn.ubuy.co.in/64da131bcad6c305ca0e5197-mcfarlane-toys-dc-multiverse-7.jpg", name: "Superman" },
    { image: "https://m.media-amazon.com/images/I/51DPmWAEDpL.jpg", name: "Spiderman" },
    { image: "https://images-cdn.ubuy.co.in/64e6c3f7ae0c047bce596027-batman-12-inch-rebirth-batman-action.jpg", name: "Batman" },
  ];

  interface categoriesProps {
    image: string;
    name: string;
    itemsAvailable: number;
  }
 
    export const categories: categoriesProps[] = [
        {
            image: "https://5.imimg.com/data5/YL/RI/OR/SELLER-95604177/stationeries-500x500-png-500x500.png",
            name: "Staionary",
            itemsAvailable: 15,
      },
      {
        image: "https://5.imimg.com/data5/SELLER/Default/2023/6/313804451/XJ/BS/UO/117482125/super-king-truck-toy.jpg",
        name: "Truck",
        itemsAvailable: 9,
      },
      
      {
        image: "https://m.media-amazon.com/images/I/71R4Lkp9FJL.jpg",
        name: "Dolls",
        itemsAvailable: 7,
      },
      {
        image: "https://m.media-amazon.com/images/I/61k4AotokRL._AC_UF1000,1000_QL80_.jpg",
        name: "Blocks",
        itemsAvailable: 6,
      },
      {
        image: "https://m.media-amazon.com/images/I/61k4AotokRL._AC_UF1000,1000_QL80_.jpg",
        name: "Blocks",
        itemsAvailable: 6,
      }
    ];
