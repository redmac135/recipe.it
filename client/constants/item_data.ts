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
    {
      name: "Vegetable Stir Fry",
      is_complete: true,
      ingredients_have_per_serving: [
        { name: "Broccoli", quantity: 100, unit: "g" },
        { name: "Bell Peppers", quantity: 100, unit: "g" },
        { name: "Soy Sauce", quantity: 50, unit: "ml" },
      ],
      max_servings: 4,
      steps: ["Chop vegetables", "Stir fry with soy sauce", "Serve hot"],
    },
    {
      name: "Grilled Cheese Sandwich",
      is_complete: true,
      ingredients_have_per_serving: [
        { name: "Bread", quantity: 2, unit: "slices" },
        { name: "Cheese", quantity: 2, unit: "slices" },
        { name: "Butter", quantity: 10, unit: "g" },
      ],
      max_servings: 1,
      steps: ["Butter bread", "Add cheese", "Grill until golden brown"],
    },
    {
      name: "Tacos",
      is_complete: false,
      ingredients_have_per_serving: [
        { name: "Tortillas", quantity: 2, unit: "pcs" },
        { name: "Ground Beef", quantity: 100, unit: "g" },
      ],
      existing_groceries_per_serving: [
        { name: "Tortillas", quantity: 2, unit: "pcs" },
      ],
      new_groceries_per_serving: [
        { name: "Lettuce", quantity: 50, unit: "g" },
        { name: "Cheese", quantity: 50, unit: "g" },
      ],
      max_servings: 3,
      estimated_cost: 10,
    },
    {
      name: "Fruit Smoothie",
      is_complete: true,
      ingredients_have_per_serving: [
        { name: "Banana", quantity: 1, unit: "pcs" },
        { name: "Strawberries", quantity: 100, unit: "g" },
        { name: "Yogurt", quantity: 200, unit: "ml" },
      ],
      max_servings: 2,
      steps: ["Blend all ingredients", "Serve chilled"],
    },
  ]
};