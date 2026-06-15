# ProductCard Component - Redesign Specifications

## Overview
The current ProductCard treats food items like retail ecommerce products. This spec transforms it into a **food-discovery focused** component that drives appetite and conversion.

---

## Current Design ❌
```
┌────────────────────────┐
│   [Food Image]         │  160px height
│   ├─ Discount -20%     │  (too small for food)
│   ├─ Featured Badge    │
│   └─ Heart Icon        │
├────────────────────────┤
│ Category (grey, small) │
│ Dish Name              │
│ ⭐ 4.5 (200)           │
│ $79.99 → $59.99        │  Discount-focused
└────────────────────────┘
```

**Problems:**
- Image too small (food is the draw!)
- Discount/sale focus (feels cheap)
- No context about delivery
- No dietary/ingredient info
- Generic category label
- Missing restaurant info

---

## Recommended Design ✅

### Option A: Compact (170px width)
```
┌────────────────────────┐
│    [Food Image]        │  200px height
│    ├─ 🌶️ Spicy        │  (dominant!)
│    ├─ ⏱️ 30min        │
│    └─ ❤️ (hollow)      │
├────────────────────────┤
│ Trattoria Roma (12px)  │  Restaurant name
│ Margherita Pizza       │  Bold, inviting
│ Fresh mozzarella...    │  Description
│ 🌱 Vegan | 🛜 GF      │  Dietary badges
│ ⭐ 4.9 (523)           │  Social proof
│ $14.99 — [+ Add]       │  CTA-focused
└────────────────────────┘
```

**Improvements:**
✅ Larger image (25% bigger, dominates card)
✅ Appetite-driven text ("Fresh mozzarella")
✅ Delivery time visible at a glance
✅ Dietary info for quick filtering
✅ Restaurant name adds credibility
✅ Inline "Add" button (no tap-to-detail needed)
✅ Spiciness indicator (food-specific)

---

## Detailed Component Specifications

### 1. Image Section (200px height)
```
Height: 200px (from 160px)
Aspect Ratio: 1:1.25 (more portrait, food-friendly)
Gradient Overlay: Bottom fade (black 40%)
Image Fit: Cover with scale-up animation on hover
Border: Rounded corners (16px)
```

**Overlays (Positioned Absolutely):**
- **Top-left**: Dietary/Type badge
  - Size: 24×24px
  - Icons: 🌶️ (Spicy), 🌱 (Vegan), 🔥 (Hot), ❄️ (Cool)
  - Background: Semi-transparent dark with border

- **Top-right**: Delivery Time
  - Size: Compact pill
  - Format: "⏱️ 30 min" or "🚚 25-35 min"
  - Background: Colors.primary with 0.9 opacity
  - Font: 12px semibold

- **Bottom-right**: Favorite Toggle
  - Size: 40×40px
  - Background: Rgba(0,0,0,0.5)
  - Icon: Heart (outline or filled based on state)
  - Animation: Scale + heart fill on toggle

---

### 2. Content Section (padding 16px)

#### A. Restaurant Name (Meta)
```
Font Size: 12px
Font Weight: 500
Color: colors.textTertiary
Text Transform: None
Margin Bottom: 4px
Example: "Trattoria Roma" or "Chef's Kitchen"
```

#### B. Dish Name (Primary)
```
Font Size: 18px
Font Weight: 600
Color: colors.text
Line Height: 1.25
Max Lines: 2
Margin Bottom: 8px
Example: "Spicy Thai Basil Stir-Fry"
```

#### C. Description (Secondary)
```
Font Size: 13px
Font Weight: 400
Color: colors.textSecondary
Max Lines: 1
Margin Bottom: 8px
Text Truncate: "..."
Example: "Tender chicken with fresh basil..."
Purpose: Whets appetite without needing details page
```

#### D. Dietary Badges Row
```
Layout: Flex row, wrap allowed
Gap: 4px
Height: 24px

Each Badge:
├─ Size: Auto (24px height, flex width)
├─ Padding: 4px 8px
├─ Border Radius: 12px
├─ Background: colors.surface (with border)
├─ Font: 10px, semibold
├─ Icon: 14px
├─ Format: "🌱 Vegan" or "🔥 Spicy"

Possible Badges:
- 🌱 Vegan
- 🌾 Vegetarian
- 🔥 Spicy
- 🛜 Gluten-Free
- 🥛 Dairy-Free
- 🌰 Nuts
- ⭐ New (if recent)
- 🏆 Chef's Pick (if featured)
```

#### E. Rating + Price Row
```
Layout: Flex row, space-between

Left (Rating):
├─ Icon: Star (12px, filled)
├─ Rating: "4.9"
├─ Reviews: "(523)"
├─ Font: 12px, semibold

Right (Price + CTA):
├─ Price: "$14.99"
├─ Font: 14px, bold, colors.primary
├─ Button: "+ Add"
├─ Button Size: 32×32px
├─ Button BG: colors.primary
├─ Button Icon: Plus (18px, colors.black)
├─ Button Animation: Scale on press, haptic feedback
```

---

### 3. Card Container
```
Width: 170px (unchanged)
Aspect Ratio: Auto (content-based)

Background: colors.surface
Border Radius: 16px
Border: 1px colors.border
Shadow: shadows.md (depth)

Press Animation:
├─ Scale: 0.96 (slight zoom-out on press)
├─ Duration: 150ms
├─ Easing: Spring.snappy

Hover/Focus:
├─ Border Color: colors.primary (0.3 opacity)
├─ Shadow: shadows.lg (elevated)
├─ Image: Slight blur/zoom effect
```

---

## Data Requirements

Update the `ProductCardProps` interface:

```typescript
interface ProductCardProps {
  // Existing
  id: string;
  name: string;
  price: number;
  imageUri?: string;
  isFavorite?: boolean;
  onPress: (id: string) => void;

  // New additions
  restaurantName?: string;           // "Trattoria Roma"
  description?: string;              // "Fresh mozzarella, basil..."
  deliveryTime?: number;             // 30 (minutes)
  deliveryTimeRange?: [number, number]; // [25, 35]
  dietaryTags?: Array<'vegan' | 'vegetarian' | 'glutenfree' | 'spicy' | 'new'>;
  rating?: number;                   // 4.9
  reviewCount?: number;              // 523
  isChefsPick?: boolean;             // Replaces isFeatured
  isNew?: boolean;                   // New in last 7 days
  isPreparedFresh?: boolean;         // Cooked to order vs pre-made
  estimatedCalories?: number;
  
  // Quick add
  onQuickAdd?: (quantity: number) => void; // New: inline add
  inCart?: number;                   // Quantity in cart
}
```

---

## Color Tokens (Dietary Badges)

```typescript
const dietaryColors = {
  vegan: {
    bg: 'rgba(16, 185, 129, 0.1)',      // Emerald
    border: '#10B981',
    text: '#10B981',
    icon: '🌱',
  },
  vegetarian: {
    bg: 'rgba(34, 197, 94, 0.1)',       // Green
    border: '#22C55E',
    text: '#22C55E',
    icon: '🥬',
  },
  spicy: {
    bg: 'rgba(249, 115, 22, 0.1)',      // Orange
    border: '#F97316',
    text: '#F97316',
    icon: '🌶️',
  },
  glutenfree: {
    bg: 'rgba(59, 130, 246, 0.1)',      // Blue
    border: '#3B82F6',
    text: '#3B82F6',
    icon: '🛜',
  },
  new: {
    bg: 'rgba(245, 166, 35, 0.1)',      // Primary
    border: '#F5A623',
    text: '#F5A623',
    icon: '⭐',
  },
  chefspick: {
    bg: 'rgba(232, 111, 74, 0.1)',      // Secondary
    border: '#E86F4A',
    text: '#E86F4A',
    icon: '🏆',
  },
};
```

---

## Animation Specifications

### Load Animation
```
Opacity: 0 → 1 (300ms)
Scale: 0.95 → 1 (withSpring)
Stagger: index × 50ms delay
```

### Press Interactions
```
Press In:
├─ Scale: 1 → 0.96
├─ Duration: 150ms
├─ Easing: spring.snappy

Press Out:
├─ Scale: 0.96 → 1
├─ Duration: 200ms
├─ Easing: spring.bouncy

Add Button Click:
├─ Scale: 1 → 0.9 → 1
├─ Duration: 300ms
├─ Haptic: Light impact
├─ Confirmation: Green checkmark pulse
```

### Hover (Web/Desktop)
```
Border: Fade to primary color (200ms)
Shadow: Elevate to shadows.lg
Image: Slight scale (1.02) and blur overlay
```

---

## Responsive Considerations

### Mobile (< 600px)
```
Card Width: (SCREEN_WIDTH - 32px - 8px gap) / 2 = ~170px
Grid: 2 columns
```

### Tablet (600-900px)
```
Card Width: (SCREEN_WIDTH - 48px - 16px gap) / 3 = ~200px
Grid: 3 columns
```

### Desktop (> 900px)
```
Card Width: (SCREEN_WIDTH - 64px - 24px gap) / 4 = ~220px
Grid: 4 columns
List View Option: Full width with image on left
```

---

## Accessibility

```typescript
// Screen reader support
accessibilityLabel={`${restaurantName} - ${name}. ${description}. $${price.toFixed(2)}. ${rating} stars from ${reviewCount} reviews.`}
accessibilityRole="button"
accessibilityHint="Double tap to add to cart"

// Dietary tags announcement
accessibilityLabel={`${dietaryTags.join(', ')} tags available`}

// Delivery time
accessibilityLabel={`Delivers in ${deliveryTime} minutes`}
```

---

## Migration Path

### Step 1: Update Props (non-breaking)
- Add new optional props to ProductCardProps
- Default to hiding new elements if not provided
- Existing code continues to work

### Step 2: Update Mock Data
- Add restaurantName, description, dietaryTags
- Add deliveryTime to products
- Keep originalPrice for backward compatibility

### Step 3: Implement Components
- Create DietaryBadge component
- Update ProductCard layout
- Add new styling and animations

### Step 4: Update HomeScreen
- Pass new props from product data
- Update mock data with realistic values

### Step 5: Testing
- Visual regression testing
- Animation smoothness on various devices
- Accessibility audit

---

## Performance Notes

```
// Image optimization
- Use caching: Image.cachePolicy = 'memory'
- Pre-load high-priority images
- Use blurhash for placeholder

// Animation optimization
- Use native driver when possible
- Reduce opacity changes (expensive)
- Use reanimated for complex animations

// Memory management
- Memoize ProductCard component
- Avoid re-renders on parent scroll
- Use virtualizedList for large grids
```

---

## Design System Integration

### New Design Tokens Needed

```typescript
// Add to colors.ts
export const dietaryPalette = {
  vegan: '#10B981',
  vegetarian: '#22C55E',
  spicy: '#F97316',
  glutenfree: '#3B82F6',
  new: '#F5A623',
  chefspick: '#E86F4A',
};

// Add to borderRadius.ts
export const borderRadius = {
  // ... existing
  badge: 12,      // For dietary badges
  deliveryPill: 24,
};

// Add to shadows.ts
// Card shadows already sufficient, no change needed
```

---

## A/B Testing Recommendations

Test these variations:
1. **Card Height**: 170px vs 200px image height
2. **CTA Style**: Inline button vs "Tap to add" vs swipe gesture
3. **Dietary Badges**: Icons only vs "icon + label"
4. **Restaurant Name**: Show vs hide
5. **Description Length**: 1 line vs 2 lines

**Primary Metric**: Add-to-cart click-through rate (CTR)
**Secondary Metrics**: Session duration, cart value, order completion rate

---

## Next: Component Implementation

Ready to build? Start with:
1. Create `DietaryBadge.tsx` component
2. Update `ProductCard.tsx` layout
3. Update `ProductCardProps` interface
4. Update mock data in `mockData.ts`
5. Test on HomeScreen

See the next section for code implementation.
