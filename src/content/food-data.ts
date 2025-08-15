export interface FoodItem {
  name: string;
  description: string;
  image: string;
  country: string;
}

export const foodData: Record<string, FoodItem[]> = {
  "Philippines": [
    {
      name: "Bibingka",
      description: "As Philippines lacks unique culture, so do they lack their own dishes. Most restaurants are western or BBQ. Bibingka is the one unique thing I tried, a soft, lightly sweet rice cake traditionally baked in banana leaves",
      image: "/assets/images/misc/bib.jpg",
      country: "Philippines"
    }
  ],
  "Vietnam": [
    {
      name: "Pho Bo",
      description: "A fragrant and comforting Vietnamese noodle soup made with tender slices of beef, flat rice noodles, and a rich, slow-simmered broth infused with star anise, cloves, cinnamon, ginger, and fish sauce, topped with fresh herbs, lime, and chili.",
      image: "/assets/images/food/phobo-2.jpg",
      country: "Vietnam"
    }
  ],
  "China": [
    {
      name: "Mapo Tofu",
      description: "A spicy and flavorful Sichuan dish featuring soft tofu, ground meat, and a bold, numbing sauce made with doubanjiang (fermented chili bean paste), Sichuan peppercorns, and garlic.",
      image: "/assets/images/misc/mapo.jpg",
      country: "China"
    },
    {
      name: "Kung Pao Chicken",
      description: "Classic Sichuan dish made with stir-fried chicken, crunchy peanuts, dried chili peppers, and a savory-sweet sauce. Infused with the tongue-tingling heat of Sichuan peppercorns.",
      image: "/assets/images/misc/kpc.jpg",
      country: "China"
    }
  ],
  "Cambodia": [
    {
      name: "Lok Lak",
      description: "A popular Cambodian stir-fried beef dish, featuring tender slices of marinated beef cooked in a savory sauce made from oyster sauce, soy sauce, and black pepper. It's typically served with fresh vegetables like lettuce, tomatoes, and cucumbers, alongside a fried egg and a dipping sauce of lime juice and Kampot pepper.",
      image: "/assets/images/misc/loklak.jpg",
      country: "Cambodia"
    },
    {
      name: "Amok",
      description: "Often considered to be Cambodia's National Dish, Amok is a flavorful and aromatic curry-like dish typically made with fish, although variations exist. The dish gets its name from the unique cooking method: the ingredients are steamed in a banana leaf cup, or sometimes inside a coconut. The heart of amok lies in its spice paste, a harmonious blend of lemongrass, galangal, turmeric, garlic, shallots, Kampot pepper, and more.",
      image: "/assets/images/food/amok.jpg",
      country: "Cambodia"
    }
  ],
  "Laos": [
    {
      name: "Laap",
      description: "A traditional minced meat or fish salad. Served with sticky rice and spicy sauces. Laap means \"good fortune\" or \"luck\" in Lao, so it's often served at weddings, New Year's celebrations, and family gatherings. It's a symbol of Lao identity and is one of the most famous dishes from Laos worldwide.",
      image: "/assets/images/food/laap.jpg",
      country: "Laos"
    }
  ],
  "Thailand": [
    {
      name: "Pineapple Fried Rice",
      description: "A vibrant Thai-inspired dish combining fragrant jasmine rice with sweet pineapple chunks, vegetables, and savory seasonings like soy sauce and curry powder. Often garnished with cashews and fresh cilantro, it's a delightful blend of sweet, savory, and nutty flavors.",
      image: "/assets/images/misc/pinea.jpg",
      country: "Thailand"
    },
    {
      name: "Khao Soi Noodles",
      description: "A creamy and aromatic Northern Thai coconut curry noodle soup, featuring soft egg noodles in a rich, spiced broth, topped with crispy fried noodles for texture. Often served with lime, pickled mustard greens, and chili oil, it offers a perfect balance of creamy, tangy, and spicy flavors.",
      image: "/assets/images/misc/khaosi.jpg",
      country: "Thailand"
    },
    {
      name: "Mango Sticky Rice",
      description: "Sweet mangoes with creamy coconut-infused sticky rice. This delightful combination of textures and flavors is a tropical treat, often garnished with sesame seeds or mung beans for a perfect balance of sweetness and nuttiness.",
      image: "/assets/images/misc/mango2.jpg",
      country: "Thailand"
    }
  ],
  "Nepal": [
    {
      name: "Nak Cheese",
      description: "A rare and flavorful cheese made from the milk of female yaks, or \"naks,\" in Nepal's high-altitude regions. Known for its earthy taste and firm texture, it's a delicacy often enjoyed in soups, curries, or as a savory snack in Himalayan cuisine.",
      image: "/assets/images/misc/nakcheese.jpg",
      country: "Nepal"
    },
    {
      name: "Thakali",
      description: "A traditional food from the Thakali people of Nepal's Mustang region, known for its flavorful dal-bhat-tarkari (lentils, rice, and vegetables), tangy pickles, and unique spices. Often served as a set meal, it strikes a perfect balance of spicy, sour, and umami flavors.",
      image: "/assets/images/food/thkali.jpg",
      country: "Nepal"
    },
    {
      name: "Momo",
      description: "A popular Nepali dumpling filled with spiced meat (like chicken or buffalo) or vegetables, wrapped in a soft flour dough. Typically steamed or fried, momo is served with a tangy tomato-based dipping sauce (achar).",
      image: "/assets/images/food/momo.jpg",
      country: "Nepal"
    }
  ],
  "East Africa": [
    {
      name: "Nyama Choma",
      description: "Nyama Choma translates to \"roasted meat\" in Swahili. It's a beloved delicacy and often considered the ultimate barbecue experience in the region. Typically, goat meat is used, but beef or chicken can also be prepared. The meat is marinated minimally, often with just salt, and then roasted or grilled slowly over an open flame.",
      image: "/assets/images/misc/nyama.jpg",
      country: "East Africa"
    },
    {
      name: "Ugali",
      description: "A simple, dense porridge made from maize (corn) flour and water, cooked until it reaches a thick, dough-like consistency. Typically, ugali is eaten with the hands and served as a side dish alongside stews, vegetables, and meats.",
      image: "/assets/images/misc/ugali.jpg",
      country: "East Africa"
    }
  ],
  "Georgia": [
    {
      name: "Churchkhela",
      description: "Almonds, walnuts, or hazelnuts are threaded onto a string and dipped in thickened grape must or fruit juices and dried in the shape of a sausage.",
      image: "/assets/images/misc/churchy.jpg",
      country: "Georgia"
    },
    {
      name: "Khinkali",
      description: "A dumpling made of twisted knobs of dough stuffed with meat.",
      image: "/assets/images/misc/kinkhali.jpg",
      country: "Georgia"
    },
    {
      name: "Khachapuri",
      description: "A bread dish filled with cheese. Adjaruli khachapuri, pictured here, contains an egg. Imeruli and Megruli are other varieties of Khachapuri with extra cheeses.",
      image: "/assets/images/food/khacha.jpg",
      country: "Georgia"
    }
  ],
  "Israel": [
    {
      name: "Etrogat",
      description: "The flavor of Jerusalem. A juice mixture of Etrog, khat, and grapefruit. Found at the Etrog Man store.",
      image: "/assets/images/misc/IMG_etrog.jpg",
      country: "Israel"
    },
    {
      name: "Shawarma",
      description: "Thinly sliced meat, typically lamb, chicken, turkey, beef, or a mixture of all. Served in pita or laffa bread. Traditionally topped with hummus, tahini, amba, schug, and/or harissa.",
      image: "/assets/images/misc/IMG_shwarma.jpg",
      country: "Israel"
    },
    {
      name: "Shakshuka",
      description: "A dish of poached eggs in a spicy tomato and pepper sauce, often served with bread.",
      image: "/assets/images/food/shakshuk-2 copy.jpg",
      country: "Israel"
    },
    {
      name: "Mafrum",
      description: "A Libyan Jewish stuffed vegetable dish. Root vegetables, typically potatoes, are hollowed out and filled with a blend of ground meat and spices. These stuffed vegetables are then fried and simmered in a tomato-based sauce.",
      image: "/assets/images/misc/mafum2.jpg",
      country: "Israel"
    },
    {
      name: "T'Becha",
      description: "A Libyan slow-cooked beef dish which is really a stew. Cumin and garlic rule this dish, along with slow-cooked beef and dried white beans, and the result is warm, nourishing, and supremely tasty.",
      image: "/assets/images/misc/tbecha3.jpg",
      country: "Israel"
    },
    {
      name: "Shamburak",
      description: "A Kurdish-Syrian pastry served with a filling of your choice. Served hot and crispy straight from the taboon oven. Inside every pastry is Indian mashed potato, fried onion, chimichurri sauce, and a meat of your choice.",
      image: "/assets/images/misc/shamburak2.jpg",
      country: "Israel"
    }
  ]
};