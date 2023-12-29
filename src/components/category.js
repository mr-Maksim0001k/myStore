export const categories = [
  {
    id: "electronics",
    name: "Электроника",
    subcategories: [
      {
        id: "phones",
        name: "Телефоны",
        subcategories: [
          {
            id: "iphone",
            name: "iPhone",
            subcategories: [
              { id: "iphone_13", name: "iPhone 13" } /* другие модели iPhone */,
            ],
          },
          {
            id: "android",
            name: "Android",
            subcategories: [
              { id: "samsung", name: "Samsung" } /* другие модели Android */,
            ],
          },
          // другие подкатегории в "Телефоны"
        ],
      },
      { id: "laptops", name: "Ноутбуки" },
      { id: "tvs", name: "Телевизоры" },
      { id: "fridges", name: "Холодильники" },
    ],
  },
  {
    id: "clothing",
    name: "Одежда",
    subcategories: [
      { id: "jackets", name: "Курточки" },
      // другие подкатегории, если есть
    ],
  },
  // другие категории
];
