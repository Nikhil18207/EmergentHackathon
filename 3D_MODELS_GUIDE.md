# 3D Fashion Models - Download Guide

## 🎯 Best Free Sources for GLB/GLTF Fashion Models

### 1. **Sketchfab** (BEST OPTION - Highly Recommended)
- **URL**: https://sketchfab.com
- **Why**: Largest collection, free downloads, GLB format support
- **Search Links**:
  - Hoodies: https://sketchfab.com/3d-models?features=downloadable&q=hoodie&sort_by=-likeCount
  - Jeans: https://sketchfab.com/3d-models?features=downloadable&q=jeans&sort_by=-likeCount
  - Dresses: https://sketchfab.com/3d-models?features=downloadable&q=dress&sort_by=-likeCount
  - T-Shirts: https://sketchfab.com/3d-models?features=downloadable&q=tshirt&sort_by=-likeCount
  - Jackets: https://sketchfab.com/3d-models?features=downloadable&q=jacket&sort_by=-likeCount
  - Pants: https://sketchfab.com/3d-models?features=downloadable&q=pants&sort_by=-likeCount
  - Accessories: https://sketchfab.com/3d-models?features=downloadable&q=accessories+clothing&sort_by=-likeCount

**How to Download from Sketchfab:**
1. Click on a model
2. Look for "Download 3D Model" button
3. Select "glTF" or "Original Format (glTF)" option
4. Extract the `.glb` file
5. Place in `f:\Fashion\frontend\public\models\`

### 2. **CGTrader**
- **URL**: https://www.cgtrader.com/free-3d-models/character/clothing
- Free GLTF models with filters
- High quality, some rigged

### 3. **TurboSquid**
- **URL**: https://www.turbosquid.com/Search/3D-Models/free/clothes
- 400+ free clothing models
- Filter by GLTF format

### 4. **Free3D**
- **URL**: https://free3d.com/3d-models/clothes
- Various formats, can convert to GLB
- Good variety

### 5. **GitHub Repositories**
- **Deep Fashion3D**: https://github.com/GAP-LAB-CUHK-SZ/deepFashion3D
  - 2000+ 3D garment models (may need conversion)
- **Awesome 3D Garments**: https://github.com/Shanthika/Awesome-3D-Garments
  - Curated research datasets

---

## 📋 Models You Need (Based on garments.json)

### ✅ Already Have:
- [x] `/models/shirt_baked.glb` - Basic T-Shirt

### ❌ Need to Download:

#### Tops (5 models needed)
- [ ] `/models/hoodie.glb` - Oversized Hoodie
- [ ] `/models/crop-top.glb` - Crop Top
- [ ] `/models/tank.glb` - Tank Top
- [ ] `/models/polo.glb` - Polo Shirt

#### Bottoms (4 models needed)
- [ ] `/models/jeans.glb` - Skinny Jeans
- [ ] `/models/cargo.glb` - Cargo Pants
- [ ] `/models/joggers.glb` - Joggers
- [ ] `/models/shorts.glb` - Athletic Shorts

#### Outerwear (4 models needed)
- [ ] `/models/bomber.glb` - Bomber Jacket
- [ ] `/models/windbreaker.glb` - Windbreaker Jacket
- [ ] `/models/denim-jacket.glb` - Denim Jacket

#### Future Additions (Dresses, Accessories, etc.)
- [ ] `/models/casual-dress.glb` - Casual Dress
- [ ] `/models/maxi-dress.glb` - Maxi Dress
- [ ] `/models/mini-skirt.glb` - Mini Skirt
- [ ] `/models/cap.glb` - Baseball Cap
- [ ] `/models/beanie.glb` - Beanie Hat
- [ ] `/models/scarf.glb` - Scarf

---

## 🔧 How to Use Downloaded Models

1. **Download** the model from Sketchfab/CGTrader
2. **Extract** if it's a ZIP file
3. **Locate** the `.glb` or `.gltf` file
4. **Rename** to match the filename in `garments.json`
5. **Move** to `f:\Fashion\frontend\public\models\`
6. **Test** in the 3D customizer

---

## 🎨 Model Requirements

- **Format**: GLB or GLTF
- **Size**: Keep under 5MB per model (optimized for web)
- **Texture**: Baked textures preferred
- **Rigging**: Not required (static models work)
- **Poly Count**: Low-poly (under 50k triangles) for performance

---

## 🚀 Quick Start

1. Go to Sketchfab: https://sketchfab.com/3d-models?features=downloadable&q=clothing
2. Filter by "Downloadable" and "Free"
3. Download 5-10 models to start
4. Place in `frontend/public/models/`
5. Update `garments.json` if needed

---

## 💡 Pro Tips

- **Search Terms**: Use "low poly", "game ready", "PBR" for better web performance
- **License**: Check CC licenses (CC0, CC-BY are best for commercial use)
- **Optimization**: Use tools like gltf-pipeline to compress large models
- **Testing**: Test each model in the 3D viewer before adding to database

---

## 📞 Need Help?

If models don't load:
1. Check browser console for errors
2. Verify file path matches `garments.json`
3. Ensure GLB format (not OBJ, FBX, etc.)
4. Check file size (should be under 10MB)
