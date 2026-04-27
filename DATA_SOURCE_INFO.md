# 📊 Data & Images Source Information

## Where is the data coming from?

All data is currently **dummy/mock data** stored in local files. This is temporary for frontend development.

### Data Files Location:

```
src/data/
├── products.js      ← Product data (6 products)
├── categories.js    ← Category data (6 categories)
├── users.js         ← User data
├── favorites.js     ← Favorites data
├── adminStats.js    ← Admin statistics
└── helpers.js       ← Helper functions
```

## 📸 Images Source

### 1. Product Images
**Source:** [Unsplash](https://unsplash.com/) (Free stock photos)

All product images use Unsplash URLs:
```javascript
imageUrl: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=900&q=80'
```

**Examples:**
- Modern Lounge Chair: `photo-1519947486511-46149fa0a254`
- Coffee Table: `photo-1538688525198-9b88f6f53126`
- Study Desk: `photo-1505693416388-ac5ce068fe85`
- Floor Lamp: `photo-1493663284031-b7e3aefcae8e`
- Sofa: `photo-1555041469-a586c61ea9bc`

### 2. 3D Models (GLB files)
**Source:** [Cloudinary](https://cloudinary.com/) (Cloud storage)

All products use the same demo 3D model:
```javascript
modelUrl: 'https://res.cloudinary.com/dfttko37d/image/upload/v1776542889/Living_Room_qllo09.glb'
```

**Note:** This is a placeholder. In production, each product should have its own unique 3D model.

## 📦 Current Products (6 items)

| ID | Name | Price | Category | Featured | New | AR |
|----|------|-------|----------|----------|-----|-----|
| p1 | Modern Lounge Chair | ₹18,500 | Chairs | ✅ | ✅ | ✅ |
| p2 | Scandinavian Coffee Table | ₹14,500 | Tables | ✅ | ❌ | ✅ |
| p3 | Compact Study Desk | ₹21,000 | Desks | ❌ | ✅ | ✅ |
| p4 | Minimal Floor Lamp | ₹9,200 | Lighting | ❌ | ❌ | ✅ |
| p5 | Modern Two-Seater Sofa | ₹48,000 | Sofas | ✅ | ✅ | ✅ |
| p6 | Bedside Storage Cabinet | ₹12,500 | Storage | ❌ | ❌ | ✅ |

## 🏷️ Categories (6 items)

1. **Chairs** - Comfortable and stylish seating options
2. **Tables** - Coffee tables, side tables, and modern surfaces
3. **Desks** - Study and workspace desks
4. **Lighting** - Modern lighting fixtures and ambient lamps
5. **Sofas** - Elegant sofas for comfort and aesthetics
6. **Storage** - Smart storage units for compact interiors

## 🔄 How Data Flows

```
src/data/products.js
        ↓
Redux Store (features/products/productSlice.js)
        ↓
Components (ProductCard, ProductListPage, etc.)
        ↓
Browser Display
```

### Example Flow:

1. **Data Definition** (`src/data/products.js`):
   ```javascript
   export const products = [
     {
       id: 'p1',
       name: 'Modern Lounge Chair',
       price: 18500,
       imageUrl: 'https://images.unsplash.com/...',
       // ... more fields
     }
   ]
   ```

2. **Redux Store** (`src/features/products/productSlice.js`):
   ```javascript
   import { products } from '../../data/products.js'
   
   const initialState = {
     items: products,  // ← Loaded here
     // ...
   }
   ```

3. **Component Usage** (`ProductListPage.jsx`):
   ```javascript
   const products = useSelector(selectFilteredProducts)
   // ← Gets data from Redux store
   ```

4. **Display** (`ProductCard.jsx`):
   ```javascript
   <img src={product.imageUrl} alt={product.name} />
   // ← Shows Unsplash image
   ```

## 🔮 Future: Backend Integration

When Member 4 builds the backend, this will change to:

### Current (Frontend Only):
```javascript
// Direct import from local file
import { products } from '../data/products'
```

### Future (With Backend):
```javascript
// API call to backend
const response = await fetch('http://api.example.com/products')
const products = await response.json()
```

### Backend Will Provide:
- ✅ Real product data from database
- ✅ User authentication
- ✅ Image upload functionality
- ✅ 3D model upload
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Search & filtering on server
- ✅ User-specific favorites

## 📝 How to Add More Products

### Option 1: Edit the data file directly

1. Open `src/data/products.js`
2. Add a new product object:

```javascript
{
  id: 'p7',
  slug: 'your-product-slug',
  name: 'Your Product Name',
  price: 15000,
  originalPrice: 18000,
  category: 'chairs', // or tables, desks, lighting, sofas, storage
  categoryLabel: 'Chairs',
  shortDescription: 'Short description here',
  description: 'Full description here',
  dimensions: {
    width: '80 cm',
    height: '100 cm',
    depth: '75 cm',
  },
  colors: ['Color1', 'Color2'],
  tags: ['Tag1', 'Tag2', 'Tag3'],
  rating: 4.5,
  reviewCount: 20,
  stock: 10,
  featured: true,
  isNew: true,
  imageUrl: 'https://images.unsplash.com/photo-YOUR-IMAGE-ID?auto=format&fit=crop&w=900&q=80',
  gallery: [
    'https://images.unsplash.com/photo-IMAGE1?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-IMAGE2?auto=format&fit=crop&w=900&q=80',
  ],
  modelUrl: 'https://your-3d-model-url.glb',
  arSupported: true,
  material: 'Wood',
  brand: 'Your Brand',
}
```

### Option 2: Find Unsplash Images

1. Go to [Unsplash.com](https://unsplash.com/)
2. Search for furniture images (e.g., "modern chair", "wooden table")
3. Click on an image
4. Copy the photo ID from URL: `unsplash.com/photos/PHOTO-ID-HERE`
5. Use format: `https://images.unsplash.com/photo-PHOTO-ID?auto=format&fit=crop&w=900&q=80`

### Option 3: Use Your Own Images

Upload to any image hosting service:
- [Cloudinary](https://cloudinary.com/) (Free tier available)
- [ImgBB](https://imgbb.com/) (Free)
- [Imgur](https://imgur.com/) (Free)

Then use the direct image URL.

## 🎨 Image URL Parameters Explained

```
https://images.unsplash.com/photo-1519947486511-46149fa0a254
  ?auto=format          ← Automatic format (WebP for modern browsers)
  &fit=crop            ← Crop to fit dimensions
  &w=900               ← Width 900px
  &q=80                ← Quality 80%
```

## 📊 Data Structure

### Product Object Fields:

```javascript
{
  id: string,              // Unique identifier
  slug: string,            // URL-friendly name
  name: string,            // Display name
  price: number,           // Current price
  originalPrice: number,   // Original price (for discount)
  category: string,        // Category key (chairs, tables, etc.)
  categoryLabel: string,   // Display category name
  shortDescription: string,// Brief description
  description: string,     // Full description
  dimensions: {
    width: string,
    height: string,
    depth: string,
  },
  colors: string[],        // Available colors
  tags: string[],          // Search tags
  rating: number,          // 0-5 rating
  reviewCount: number,     // Number of reviews
  stock: number,           // Available quantity
  featured: boolean,       // Show on homepage
  isNew: boolean,          // "New" badge
  imageUrl: string,        // Main product image
  gallery: string[],       // Additional images
  modelUrl: string,        // 3D model file (.glb)
  arSupported: boolean,    // AR availability
  material: string,        // Material type
  brand: string,           // Brand name
}
```

## 🔍 Summary

**Current Setup:**
- ✅ All data is **local dummy data**
- ✅ Images from **Unsplash** (free stock photos)
- ✅ 3D models from **Cloudinary** (placeholder)
- ✅ No backend required for now
- ✅ Perfect for frontend development

**Future (After Backend):**
- 🔄 Data from **database** (MongoDB/PostgreSQL)
- 🔄 Images uploaded by **admin**
- 🔄 3D models uploaded by **admin**
- 🔄 Real-time updates
- 🔄 User authentication

This dummy data setup allows you to build and test the complete frontend without waiting for the backend! 🚀
