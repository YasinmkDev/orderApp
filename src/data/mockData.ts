import { Item, Category, SaleOrder, Customer, CustomerAddress } from '../types';

export const mockCustomer: Customer = {
  id: 'demo-user',
  name: 'Alex Demo',
  email: 'demo@example.com',
  phone: '+1 (555) 123-4567',
};

export const mockAddresses: CustomerAddress[] = [
  {
    id: 'addr-1',
    label: 'Home',
    address: '123 Main Street, Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    isDefault: true,
    branchId: '1',
  },
  {
    id: 'addr-2',
    label: 'Office',
    address: '456 Market Street, Suite 200',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    isDefault: false,
    branchId: '1',
  },
];

export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Main Courses', description: 'Gourmet artisan mains & family plates', image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300', parentId: undefined, branchId: '1', itemCount: 10 },
  { id: 'cat-2', name: 'Breakfast', description: 'Gourmet eggs, artisanal toasts & energy bowls', image: 'https://images.pexels.com/photos/1092732/pexels-photo-1092732.jpeg?auto=compress&cs=tinysrgb&w=300', parentId: undefined, branchId: '1', itemCount: 1 },
  { id: 'cat-3', name: 'Salads', description: 'Crisp organic harvest greens & healthy bowls', image: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=300', parentId: undefined, branchId: '1', itemCount: 1 },
  { id: 'cat-4', name: 'Desserts', description: 'Warm melting lava cakes & sweet culinary sins', image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=300', parentId: undefined, branchId: '1', itemCount: 2 },
  { id: 'cat-5', name: 'Beverages', description: 'Exotic tropical smoothies, craft sodas & juices', image: 'https://images.pexels.com/photos/2082063/pexels-photo-2082063.jpeg?auto=compress&cs=tinysrgb&w=300', parentId: undefined, branchId: '1', itemCount: 1 },
  { id: 'cat-6', name: 'Chef Specials', description: 'Exclusive signature creations by our head chef', image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=300', parentId: undefined, branchId: '1', itemCount: 4 },
];

export const mockProducts: Item[] = [
  { id: 'prod-1', name: 'Spicy Thai Basil Stir-Fry', description: 'Tender chicken, fresh basil, garlic, chilies in coconut cream', price: 14.99, image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-1', categoryName: 'Main Courses', branchId: '1', isAvailable: true, isFeatured: true, sku: 'TH-001', unit: 'each', restaurantName: 'Trattoria Roma', shortDescription: 'Tender chicken, fresh basil, garlic, chilies...', dietaryTags: ['spicy'], deliveryTime: 25, rating: 4.8, reviewCount: 342 },
  { id: 'prod-2', name: 'Margherita Pizza', description: 'Fresh mozzarella, San Marzano tomatoes, fresh basil, olive oil', price: 16.99, image: 'https://images.pexels.com/photos/2082063/pexels-photo-2082063.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-1', categoryName: 'Main Courses', branchId: '1', isAvailable: true, isFeatured: true, sku: 'IT-001', unit: 'each', restaurantName: 'Pasta Paradise', shortDescription: 'Fresh mozzarella, basil, tomatoes, olive oil...', dietaryTags: ['vegetarian'], deliveryTime: 30, rating: 4.9, reviewCount: 521, variants: [
    { id: 'var-pizza-small', name: 'Small', priceAdjustment: 0, icon: '🍕', description: '8 inch', isDefault: true },
    { id: 'var-pizza-medium', name: 'Medium', priceAdjustment: 2.99, icon: '🍕', description: '10 inch' },
    { id: 'var-pizza-large', name: 'Large', priceAdjustment: 5.99, icon: '🍕', description: '12 inch' },
    { id: 'var-pizza-xlarge', name: 'X-Large', priceAdjustment: 8.99, icon: '🍕', description: '14 inch' },
  ], modifierGroups: [
    { id: 'mod-group-crust', name: 'Crust Type', modifiers: [
      { id: 'mod-thin', name: 'Thin Crust', price: 0, icon: '', isDefault: true },
      { id: 'mod-thick', name: 'Thick Crust', price: 1.50, icon: ''},
      { id: 'mod-stuffed', name: 'Stuffed Crust', price: 2.50, icon: '' },
    ] },
    { id: 'mod-group-toppings', name: 'Extra Toppings', modifiers: [
      { id: 'mod-pepperoni', name: 'Pepperoni', price: 1.99, icon: '🌶️', category: 'Meat' },
      { id: 'mod-mushroom', name: 'Mushrooms', price: 1.49, icon: '🍄', category: 'Veggies' },
      { id: 'mod-olives', name: 'Black Olives', price: 1.49, icon: '🫒', category: 'Veggies' },
      { id: 'mod-spinach', name: 'Fresh Spinach', price: 1.49, icon: '🥬', category: 'Veggies' },
      { id: 'mod-sausage', name: 'Italian Sausage', price: 2.49, icon: '🥓', category: 'Meat' },
      { id: 'mod-feta', name: 'Feta Cheese', price: 1.99, icon: '🧀', category: 'Cheese' },
    ] },
  ] },
  { id: 'prod-3', name: 'Buddha Bowl', description: 'Quinoa, roasted vegetables, chickpeas, tahini dressing, avocado', price: 13.49, image: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-1', categoryName: 'Main Courses', branchId: '1', isAvailable: true, isFeatured: false, sku: 'VG-001', unit: 'each', restaurantName: 'Green Haven', shortDescription: 'Quinoa, roasted veggies, chickpeas, tahini...', dietaryTags: ['vegan', 'vegetarian'], deliveryTime: 20, rating: 4.7, reviewCount: 218 },
  { id: 'prod-4', name: 'Crispy Shrimp Tacos', description: 'Beer-battered shrimp, cabbage slaw, cilantro lime crema, chipotle mayo', price: 12.99, image: 'https://images.pexels.com/photos/3916857/pexels-photo-3916857.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-1', categoryName: 'Main Courses', branchId: '1', isAvailable: true, isFeatured: false, sku: 'MX-001', unit: 'each', restaurantName: 'Taco Fiesta', shortDescription: 'Beer-battered shrimp, slaw, cilantro, chipotle...', dietaryTags: ['spicy'], deliveryTime: 15, rating: 4.6, reviewCount: 289 },
  { id: 'prod-5', name: 'Grilled Salmon Fillet', description: 'Wild-caught salmon, lemon butter sauce, asparagus, herb rice', price: 24.99, image: 'https://images.pexels.com/photos/3535149/pexels-photo-3535149.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-1', categoryName: 'Main Courses', branchId: '1', isAvailable: true, isFeatured: true, sku: 'SF-001', unit: 'each', restaurantName: 'Ocean Blue', shortDescription: 'Wild salmon, lemon butter, asparagus, rice...', dietaryTags: ['glutenFree'], deliveryTime: 35, rating: 4.9, reviewCount: 467 },
  { id: 'prod-6', name: 'Creamy Mushroom Risotto', description: 'Arborio rice, porcini mushrooms, white wine, Parmigiano-Reggiano', price: 15.99, image: 'https://images.pexels.com/photos/3915857/pexels-photo-3915857.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-1', categoryName: 'Main Courses', branchId: '1', isAvailable: true, isFeatured: false, sku: 'IT-002', unit: 'each', restaurantName: 'Pasta Paradise', shortDescription: 'Arborio rice, mushrooms, wine, Parmigiano...', dietaryTags: ['vegetarian'], deliveryTime: 28, rating: 4.8, reviewCount: 195 },
  { id: 'prod-7', name: 'Korean Beef Bulgogi', description: 'Marinated beef, sautéed with kimchi, served with steamed rice', price: 17.99, image: 'https://images.pexels.com/photos/3208566/pexels-photo-3208566.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-1', categoryName: 'Main Courses', branchId: '1', isAvailable: true, isFeatured: true, sku: 'KR-001', unit: 'each', restaurantName: 'Seoul Kitchen', shortDescription: 'Marinated beef, kimchi, rice, traditional...', dietaryTags: ['spicy'], deliveryTime: 22, rating: 4.7, reviewCount: 334 },
  { id: 'prod-8', name: 'Caesar Salad with Grilled Chicken', description: 'Romaine lettuce, parmesan, house-made croutons, grilled chicken breast', price: 13.99, image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-3', categoryName: 'Salads', branchId: '1', isAvailable: true, isFeatured: false, sku: 'SA-001', unit: 'each', restaurantName: 'Fresh Greens Co', shortDescription: 'Romaine, parmesan, croutons, grilled chicken...', dietaryTags: ['glutenFree'], deliveryTime: 12, rating: 4.6, reviewCount: 156 },
  { id: 'prod-9', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten center, vanilla ice cream, berry coulis', price: 9.99, image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-4', categoryName: 'Desserts', branchId: '1', isAvailable: true, isFeatured: false, sku: 'DS-001', unit: 'each', restaurantName: 'Sweet Indulgence', shortDescription: 'Warm chocolate, molten center, ice cream...', dietaryTags: ['vegetarian'], deliveryTime: 10, rating: 4.9, reviewCount: 678 },
  { id: 'prod-10', name: 'Fresh Mango Smoothie', description: 'Ripe mango, coconut milk, Greek yogurt, honey', price: 8.99, image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-5', categoryName: 'Beverages', branchId: '1', isAvailable: true, isFeatured: true, sku: 'BV-001', unit: 'each', restaurantName: 'Juice Station', shortDescription: 'Ripe mango, coconut milk, yogurt, honey...', dietaryTags: ['vegan'], deliveryTime: 5, rating: 4.8, reviewCount: 412 },
  { id: 'prod-11', name: 'Organic Avocado Toast', description: 'Toasted sourdough, mashed avocado, cherry tomatoes, microgreens, sea salt', price: 11.99, image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-2', categoryName: 'Breakfast', branchId: '1', isAvailable: true, isFeatured: false, sku: 'BR-001', unit: 'each', restaurantName: 'Breakfast Club', shortDescription: 'Sourdough, avocado, tomatoes, microgreens...', dietaryTags: ['vegan'], deliveryTime: 8, rating: 4.7, reviewCount: 289 },
  { id: 'prod-12', name: 'Paneer Tikka Masala', description: 'Tandoori paneer cubes, tomato-cream sauce, naan bread, basmati rice', price: 14.99, image: 'https://images.pexels.com/photos/3916857/pexels-photo-3916857.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-1', categoryName: 'Main Courses', branchId: '1', isAvailable: true, isFeatured: false, sku: 'IN-001', unit: 'each', restaurantName: 'Curry House', shortDescription: 'Tandoori paneer, tomato sauce, naan, rice...', dietaryTags: ['vegetarian', 'spicy'], deliveryTime: 32, rating: 4.8, reviewCount: 356 },
  { id: 'prod-13', name: 'Classic Burger & Fries', description: 'Grass-fed beef patty, cheddar, lettuce, tomato, special sauce, brioche bun', price: 16.99, image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-1', categoryName: 'Main Courses', branchId: '1', isAvailable: true, isFeatured: true, sku: 'BR-002', unit: 'each', restaurantName: 'Burger Bar', shortDescription: 'Grass-fed beef, cheddar, lettuce, sauce...', dietaryTags: [], deliveryTime: 18, rating: 4.7, reviewCount: 523, variants: [
    { id: 'var-classic-single', name: 'Single', priceAdjustment: 0, icon: '🍔', description: 'Perfect for one', isDefault: true },
    { id: 'var-classic-double', name: 'Double', priceAdjustment: 5.99, icon: '🍔🍔', description: 'Double the goodness' },
    { id: 'var-classic-triple', name: 'Triple', priceAdjustment: 9.99, icon: '🍔🍔🍔', description: 'Ultimate feast' },
  ], modifierGroups: [
    { id: 'mod-group-1', name: 'Sauces', modifiers: [
      { id: 'mod-mayo', name: 'Extra Mayo', price: 0.50, icon: '🥄' },
      { id: 'mod-ketchup', name: 'Extra Ketchup', price: 0.50, icon: '🍅' },
      { id: 'mod-mustard', name: 'Spicy Mustard', price: 0.75, icon: '🌶️' },
      { id: 'mod-bbq', name: 'BBQ Sauce', price: 0.99, icon: '🔥' },
    ] },
    { id: 'mod-group-2', name: 'Extras', modifiers: [
      { id: 'mod-bacon', name: 'Crispy Bacon', price: 2.49, icon: '🥓', category: 'Meat' },
      { id: 'mod-cheese', name: 'Extra Cheese', price: 1.49, icon: '🧀', category: 'Cheese' },
      { id: 'mod-avocado', name: 'Sliced Avocado', price: 2.99, icon: '🥑', category: 'Veggies' },
      { id: 'mod-fried-egg', name: 'Fried Egg', price: 1.99, icon: '🍳', category: 'Eggs' },
      { id: 'mod-grilled-onion', name: 'Grilled Onions', price: 0.99, icon: '🧅', category: 'Veggies' },
    ] },
  ] },
  { id: 'prod-14', name: 'Caprese Panini', description: 'Fresh mozzarella, ripe tomato, basil, balsamic glaze, focaccia bread', price: 12.49, image: 'https://images.pexels.com/photos/2082063/pexels-photo-2082063.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-6', categoryName: 'Sandwiches', branchId: '1', isAvailable: true, isFeatured: false, sku: 'SD-001', unit: 'each', restaurantName: 'Sandwich Co', shortDescription: 'Mozzarella, tomato, basil, balsamic, focaccia...', dietaryTags: ['vegetarian'], deliveryTime: 14, rating: 4.6, reviewCount: 201 },
  { id: 'prod-15', name: 'Thai Green Curry', description: 'Green curry paste, coconut milk, Thai basil, bamboo shoots, jasmine rice', price: 15.49, image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-1', categoryName: 'Main Courses', branchId: '1', isAvailable: true, isFeatured: false, sku: 'TH-002', unit: 'each', restaurantName: 'Trattoria Roma', shortDescription: 'Green curry, coconut, basil, bamboo shoots...', dietaryTags: ['spicy', 'vegan'], deliveryTime: 24, rating: 4.8, reviewCount: 278 },
  { id: 'prod-16', name: 'Tiramisu', description: 'Layers of ladyfinger cookies, espresso, mascarpone, cocoa powder', price: 8.49, image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-4', categoryName: 'Desserts', branchId: '1', isAvailable: true, isFeatured: true, sku: 'DS-002', unit: 'each', restaurantName: 'Dolce Vita', shortDescription: 'Ladyfingers, espresso, mascarpone, cocoa...', dietaryTags: ['vegetarian'], deliveryTime: 8, rating: 4.9, reviewCount: 445 },
];

export const mockOrders: SaleOrder[] = [
  {
    id: 'order-1',
    orderNumber: 'ORD-2024-001',
    date: '2024-06-01T10:30:00Z',
    status: 'Delivered',
    total: 249.97,
    subtotal: 229.97,
    tax: 20.00,
    discount: 0,
    lines: [
      { id: 'line-1', itemId: 'prod-2', itemName: 'Smart Fitness Watch', quantity: 1, price: 129.99, total: 129.99, image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=100' },
      { id: 'line-2', itemId: 'prod-7', itemName: 'Running Sneakers', quantity: 1, price: 89.99, total: 89.99, image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100' },
    ],
    deliveryAddress: mockAddresses[0],
  },
  {
    id: 'order-2',
    orderNumber: 'ORD-2024-002',
    date: '2024-06-05T14:15:00Z',
    status: 'Processing',
    total: 104.97,
    subtotal: 96.97,
    tax: 8.00,
    discount: 0,
    lines: [
      { id: 'line-3', itemId: 'prod-1', itemName: 'Wireless Bluetooth Headphones', quantity: 1, price: 79.99, total: 79.99, image: 'https://images.pexels.com/photos/3394656/pexels-photo-3394656.jpeg?auto=compress&cs=tinysrgb&w=100' },
      { id: 'line-4', itemId: 'prod-9', itemName: 'Ceramic Coffee Mug Set', quantity: 1, price: 34.99, total: 34.99, image: 'https://images.pexels.com/photos/60619/coffee-mug-coffee-cup-coffee-60619.jpeg?auto=compress&cs=tinysrgb&w=100' },
    ],
    deliveryAddress: mockAddresses[1],
  },
  {
    id: 'order-3',
    orderNumber: 'ORD-2024-003',
    date: '2024-06-08T09:00:00Z',
    status: 'Pending',
    total: 62.97,
    subtotal: 57.97,
    tax: 5.00,
    discount: 0,
    lines: [
      { id: 'line-5', itemId: 'prod-5', itemName: 'Cotton Crew Neck T-Shirt', quantity: 2, price: 19.99, total: 39.98, image: 'https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?auto=compress&cs=tinysrgb&w=100' },
      { id: 'line-6', itemId: 'prod-8', itemName: 'Yoga Mat', quantity: 1, price: 29.99, total: 29.99, image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=100' },
    ],
    deliveryAddress: mockAddresses[0],
  },
  {
    id: 'order-4',
    orderNumber: 'ORD-2024-004',
    date: '2024-06-09T16:45:00Z',
    status: 'Shipped',
    total: 39.99,
    subtotal: 36.99,
    tax: 3.00,
    discount: 0,
    lines: [
      { id: 'line-7', itemId: 'prod-15', itemName: 'Laptop Stand', quantity: 1, price: 39.99, total: 39.99, image: 'https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg?auto=compress&cs=tinysrgb&w=100' },
    ],
    deliveryAddress: mockAddresses[0],
  },
];
