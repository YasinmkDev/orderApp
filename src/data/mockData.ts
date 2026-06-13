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
  { id: 'cat-1', name: 'Electronics', description: 'Gadgets and devices', image: 'https://images.pexels.com/photos/343457/pexels-photo-343457.jpeg?auto=compress&cs=tinysrgb&w=200', parentId: undefined, branchId: '1', itemCount: 12 },
  { id: 'cat-2', name: 'Clothing', description: 'Apparel and accessories', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=200', parentId: undefined, branchId: '1', itemCount: 8 },
  { id: 'cat-3', name: 'Home', description: 'Home decor and furniture', image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=200', parentId: undefined, branchId: '1', itemCount: 6 },
  { id: 'cat-4', name: 'Sports', description: 'Sports equipment and gear', image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=200', parentId: undefined, branchId: '1', itemCount: 5 },
  { id: 'cat-5', name: 'Books', description: 'Books and stationery', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=200', parentId: undefined, branchId: '1', itemCount: 4 },
  { id: 'cat-6', name: 'Food', description: 'Groceries and food items', image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=200', parentId: undefined, branchId: '1', itemCount: 10 },
];

export const mockProducts: Item[] = [
  { id: 'prod-1', name: 'Wireless Bluetooth Headphones', description: 'Over-ear wireless headphones with active noise cancellation and 30-hour battery life.', price: 79.99, image: 'https://images.pexels.com/photos/3394656/pexels-photo-3394656.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-1', categoryName: 'Electronics', branchId: '1', isAvailable: true, isFeatured: true, sku: 'BT-001', unit: 'each' },
  { id: 'prod-2', name: 'Smart Fitness Watch', description: 'Track your workouts, heart rate, sleep, and notifications with this waterproof smartwatch.', price: 129.99, image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-1', categoryName: 'Electronics', branchId: '1', isAvailable: true, isFeatured: true, sku: 'SW-001', unit: 'each' },
  { id: 'prod-3', name: 'Portable Bluetooth Speaker', description: '360-degree sound, waterproof, 12-hour battery, perfect for outdoor adventures.', price: 49.99, image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-1', categoryName: 'Electronics', branchId: '1', isAvailable: true, isFeatured: false, sku: 'SP-001', unit: 'each' },
  { id: 'prod-4', name: 'Wireless Charging Pad', description: 'Fast 15W wireless charging for Qi-compatible devices. Sleek and compact design.', price: 24.99, image: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-1', categoryName: 'Electronics', branchId: '1', isAvailable: true, isFeatured: false, sku: 'CH-001', unit: 'each' },
  { id: 'prod-5', name: 'Cotton Crew Neck T-Shirt', description: 'Premium 100% cotton, comfortable fit, available in multiple colors.', price: 19.99, image: 'https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-2', categoryName: 'Clothing', branchId: '1', isAvailable: true, isFeatured: true, sku: 'TS-001', unit: 'each' },
  { id: 'prod-6', name: 'Slim Fit Denim Jeans', description: 'Classic slim fit jeans with stretch for comfort. Dark wash finish.', price: 59.99, image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-2', categoryName: 'Clothing', branchId: '1', isAvailable: true, isFeatured: false, sku: 'JN-001', unit: 'each' },
  { id: 'prod-7', name: 'Running Sneakers', description: 'Lightweight breathable mesh with cushioned sole. Perfect for daily runs.', price: 89.99, image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-4', categoryName: 'Sports', branchId: '1', isAvailable: true, isFeatured: true, sku: 'SN-001', unit: 'each' },
  { id: 'prod-8', name: 'Yoga Mat', description: '6mm thick non-slip yoga mat with carrying strap. Eco-friendly material.', price: 29.99, image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-4', categoryName: 'Sports', branchId: '1', isAvailable: true, isFeatured: false, sku: 'YM-001', unit: 'each' },
  { id: 'prod-9', name: 'Ceramic Coffee Mug Set', description: 'Set of 4 handcrafted ceramic mugs. Microwave and dishwasher safe.', price: 34.99, image: 'https://images.pexels.com/photos/60619/coffee-mug-coffee-cup-coffee-60619.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-3', categoryName: 'Home', branchId: '1', isAvailable: true, isFeatured: false, sku: 'MG-001', unit: 'set' },
  { id: 'prod-10', name: 'Table Lamp', description: 'Modern minimalist LED table lamp with touch dimming. Warm white light.', price: 44.99, image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-3', categoryName: 'Home', branchId: '1', isAvailable: true, isFeatured: true, sku: 'TL-001', unit: 'each' },
  { id: 'prod-11', name: 'Organic Green Tea', description: 'Premium organic loose leaf green tea, 100g. Rich in antioxidants.', price: 12.99, image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-6', categoryName: 'Food', branchId: '1', isAvailable: true, isFeatured: false, sku: 'GT-001', unit: 'pack' },
  { id: 'prod-12', name: 'Mixed Nuts Assortment', description: 'Almonds, cashews, walnuts, and pistachios. 500g resealable bag.', price: 16.99, image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-6', categoryName: 'Food', branchId: '1', isAvailable: true, isFeatured: false, sku: 'NT-001', unit: 'pack' },
  { id: 'prod-13', name: 'Notebook Set', description: '3 pack of ruled notebooks with premium paper. 120 pages each.', price: 14.99, image: 'https://images.pexels.com/photos/2235831/pexels-photo-2235831.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-5', categoryName: 'Books', branchId: '1', isAvailable: true, isFeatured: false, sku: 'NB-001', unit: 'pack' },
  { id: 'prod-14', name: 'Gel Pen Set', description: '10 assorted color gel pens. Smooth writing, 0.7mm tip.', price: 9.99, image: 'https://images.pexels.com/photos/1936857/pexels-photo-1936857.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-5', categoryName: 'Books', branchId: '1', isAvailable: true, isFeatured: false, sku: 'PN-001', unit: 'set' },
  { id: 'prod-15', name: 'Laptop Stand', description: 'Adjustable aluminum laptop stand. Ergonomic design, fits up to 17" laptops.', price: 39.99, image: 'https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-1', categoryName: 'Electronics', branchId: '1', isAvailable: true, isFeatured: false, sku: 'LS-001', unit: 'each' },
  { id: 'prod-16', name: 'Backpack', description: 'Water-resistant travel backpack with laptop compartment. 25L capacity.', price: 54.99, image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400', categoryId: 'cat-2', categoryName: 'Clothing', branchId: '1', isAvailable: true, isFeatured: false, sku: 'BP-001', unit: 'each' },
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
