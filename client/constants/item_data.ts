export default { items : [
    "Burger Buns",
    "Hot Dog",
    "Kale and Feta Cheese Sandwich with Garlic Aioli",
    "Pasta Salad",
    "Pulled Pork Sandwich",
    "Roasted Chicken",
    "Salad",
    "Sausage",
    "Steak",
    "Tacos",
    "Turkey Sandwich",
    "Veggie Burger",
    "Wings",
  ],
  prices : [
    "$2.99",
    "$3.99",
    "$4.99",
    "$5.99",
    "$6.99",
    "$7.99",
    "$8.99",
    "$9.99",
    "$10.99",
    "$11.99",
    "$12.99",
    "$13.99",
    "$14.99",
  ],
  testerItems : [
    {
      name: "Farouk",
      expiry_date: "2022-12-30",
      unit: "g",
      category: "Fridge",
      quantity: 1,
    },
    {
      name: "Checken Pot Pie Autn Nona Made In Montego Bay",
      expiry_date: "2022-12-31",
      unit: "g",
      category: "Fridge",
      quantity: 1,
    },
    {
      name: "Eggs",
      expiry_date: "2022-12-31",
      unit: "units",
      category: "Fridge",
      quantity: 2
    },
    {
      name: "Bread",
      expiry_date: "2022-12-31",
      unit: "loaves",
      category: "Pantry",
      quantity: 3
    },
    {
      name: "Chicken",
      expiry_date: "2022-12-31",
      unit: "pounds",
      category: "Freezer",
      quantity: 3
    },
    {
      name: "Farouk",
      expiry_date: "2022-12-30",
      unit: "g",
      category: "Fridge",
      quantity: 1,
    },
    {
      name: "Checken Pot Pie Autn Nona Made In Montego Bay",
      expiry_date: "2022-12-31",
      unit: "g",
      category: "Fridge",
      quantity: 1,
    },
    {
      name: "Eggs",
      expiry_date: "2022-12-31",
      unit: "units",
      category: "Fridge",
      quantity: 2
    },
    {
      name: "Bread",
      expiry_date: "2022-12-31",
      unit: "loaves",
      category: "Pantry",
      quantity: 3
    },
  ],
   recipeItems : [
    {
      id: "1",
      name: "Spaghetti Bolognese",
      is_complete: true,
      ingredients_have_per_serving: [
        { name: "Spaghetti", quantity: 100, unit: "g" },
        { name: "Ground Beef", quantity: 150, unit: "g" },
        { name: "Tomato Sauce", quantity: 100, unit: "ml" },
      ],
      max_servings: 4,
      steps: ["Boil spaghetti", "Cook ground beef", "Add tomato sauce", "Mix together"],
    },
    {
      id: "2",
      name: "Chicken Salad",
      is_complete: true,
      ingredients_have_per_serving: [
        { name: "Chicken Breast", quantity: 200, unit: "g" },
        { name: "Lettuce", quantity: 50, unit: "g" },
        { name: "Tomatoes", quantity: 2, unit: "pcs" },
      ],
      max_servings: 2,
      steps: ["Grill chicken", "Chop lettuce and tomatoes", "Mix together"],
    },
    {
      id: "3",
      name: "Pancakes",
      is_complete: true,
      ingredients_have_per_serving: [
        { name: "Flour", quantity: 100, unit: "g" },
        { name: "Milk", quantity: 200, unit: "ml" },
        { name: "Eggs", quantity: 2, unit: "pcs" },
      ],
      max_servings: 3,
      steps: ["Mix ingredients", "Cook on skillet", "Serve with syrup"],
    },
    {
      id:"4",
      name: "Beef Stew",
      is_complete: false,
      ingredients_have_per_serving: [
        { name: "Beef", quantity: 200, unit: "g" },
        { name: "Carrots", quantity: 100, unit: "g" },
      ],
      existing_groceries_per_serving: [
        { name: "Beef", quantity: 200, unit: "g" },
      ],
      new_groceries_per_serving: [
        { name: "Potatoes", quantity: 150, unit: "g" },
        { name: "Onions", quantity: 1, unit: "pcs" },
      ],
      max_servings: 5,
      estimated_cost: 15,
    },
  ]
};