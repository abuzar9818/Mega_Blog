# Appwrite Configuration Guide for MegaBlog

## 🔧 Required Appwrite Settings

Follow these steps to fix image upload and display issues:

### 1. **Storage Bucket Settings**

Go to **Storage** → Select your bucket (usually named "images") → **Settings**

#### A. Permissions Tab
**CRITICAL - This fixes 403 errors!**

1. Click on the **"Permissions"** tab
2. You should see a table with roles and permissions
3. **Users Role** (should already be there):
   - ✅ **Create** (checked)
   - ✅ **Read** (checked)
   - ✅ **Update** (checked)
   - ✅ **Delete** (checked)
4. **Any Role** (for public access):
   - ✅ **Read** (MUST be checked - this allows anyone to view images)
   - ❌ Create (unchecked)
   - ❌ Update (unchecked)
   - ❌ Delete (unchecked)

**⚠️ CRITICAL STEP**: 
- Scroll down to the bottom of the Permissions section
- Click the **"Update"** button (gray button, bottom right)
- Wait for confirmation that permissions were saved
- If "Any" role is missing, click **"+ Add role"** and select "Any", then check "Read"

**If you don't click "Update", the permissions won't be saved and you'll keep getting 403 errors!**

#### B. File Security Settings
- **File Security Toggle**: 
  - Currently **OFF** (disabled) - This is correct for your setup
  - When disabled, bucket-level permissions apply to all files

#### C. Allowed File Extensions
Go to **Settings** → Find **"Allowed file extensions"** or **"File restrictions"**

Add these extensions (one per line or comma-separated):
```
png
jpg
jpeg
gif
webp
```

**OR** if there's an option to "Allow all image types", enable that.

**⚠️ IMPORTANT**: Click **"Update"** or **"Save"** after adding extensions!

### 2. **Database Collection Settings**

Go to **Databases** → Your database → **Collections** → Select "article" collection

#### Permissions
- **Users Role**: 
  - ✅ Create
  - ✅ Read
  - ✅ Update
  - ✅ Delete
- **Any Role**:
  - ✅ Read (for public viewing of posts)

**⚠️ IMPORTANT**: Click **"Update"** to save!

### 3. **Authentication Settings**

Go to **Auth** → **Settings**

#### Platforms
Make sure your development URL is added:
- **Web Platform**: `http://localhost:5174` (or your Vite dev port)
- **Production URL**: Your production domain (if deployed)

### 4. **Verify Your Configuration**

After making changes:

1. **Restart your dev server**:
   ```bash
   npm run dev
   ```

2. **Hard refresh your browser** (Ctrl+Shift+R or Cmd+Shift+R)

3. **Try uploading an image**:
   - Go to `/add-post`
   - Select an image file (PNG, JPG, JPEG, GIF, or WEBP)
   - Submit the form
   - Check browser console for any errors

### 5. **Troubleshooting**

#### Error: "File extension not allowed"
- ✅ Check that file extensions are added in bucket settings
- ✅ Make sure you clicked "Update" after adding extensions
- ✅ Try a different image format (e.g., PNG instead of JPG)

#### Error: "403 Forbidden" when viewing images
**This is the most common issue!**

1. ✅ Go to **Storage** → Your bucket → **Permissions** tab
2. ✅ Verify **"Any"** role exists and has **"Read"** checked
3. ✅ **MOST IMPORTANT**: Click the **"Update"** button at the bottom right
4. ✅ Wait for the success message
5. ✅ Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
6. ✅ If still not working:
   - Check that File Security is **disabled** (OFF)
   - Try deleting and re-uploading the image
   - Check browser console for the exact error URL

#### Error: "Image upload failed"
- ✅ Verify "Users" role has "Create" permission in bucket settings
- ✅ Check that you're logged in
- ✅ Verify file size is under 20MB (Appwrite limit)

#### Images not showing after upload
- ✅ Wait a few seconds for Appwrite to process the file
- ✅ Hard refresh the page (Ctrl+Shift+R)
- ✅ Check browser console for 403 errors
- ✅ Verify the file was actually uploaded (check Storage → Files in Appwrite console)

### 6. **Quick Checklist**

Before testing, ensure:
- [ ] Bucket "Users" role: Create, Read, Update, Delete ✅
- [ ] Bucket "Any" role: Read ✅
- [ ] File extensions added: png, jpg, jpeg, gif, webp ✅
- [ ] All changes saved with "Update" button ✅
- [ ] Dev server restarted ✅
- [ ] Browser hard refreshed ✅

---

## 📝 Current Configuration Values

Your current Appwrite configuration (from `src/conf/conf.js`):
- **Endpoint**: `https://fra.cloud.appwrite.io/v1`
- **Project ID**: `691c7842003c1e5784ad`
- **Database ID**: `691c78ec001982f49194`
- **Collection ID**: `article`
- **Bucket ID**: `691c93c9000fd48102ba`

---

## 🎨 What Was Fixed

1. ✅ **Post Page Design**: Modern gradient background, better image display, improved layout
2. ✅ **Image Validation**: Proper validation of Appwrite file IDs
3. ✅ **Error Handling**: Better error messages and user feedback
4. ✅ **Image Loading**: Loading spinners and fallback placeholders
5. ✅ **PostCard Styling**: Enhanced card design with proper image handling

---
If you still encounter issues after following this guide, check the browser console for specific error messages and share them for further assistance.