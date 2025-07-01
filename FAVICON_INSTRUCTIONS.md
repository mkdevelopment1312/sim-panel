# Favicon Generation Instructions

## Converting SVG to ICO

To create a proper favicon.ico file from the provided favicon.svg, you can use one of these methods:

### Method 1: Online Converter (Recommended)
1. Go to https://favicon.io/favicon-converter/
2. Upload the `public/favicon.svg` file
3. Download the generated favicon.ico
4. Replace the existing favicon.svg with favicon.ico in the /public/ directory
5. Update the HTML link tag to: `<link rel="icon" type="image/x-icon" href="./favicon.ico" />`

### Method 2: Using ImageMagick (Command Line)
```bash
convert public/favicon.svg -resize 32x32 public/favicon.ico
```

### Method 3: Using GIMP
1. Open favicon.svg in GIMP
2. Scale image to 32x32 pixels
3. Export as favicon.ico

### Method 4: Using Photoshop
1. Open favicon.svg in Photoshop
2. Resize to 32x32 pixels
3. Save for Web as ICO format

## Current Favicon Design
The favicon features:
- Stylized letter 'K' for Kamil Maslanka
- Cyberpunk color scheme (neon green gradient)
- Dark background (#0a0a0a)
- Professional geometric design
- 64x64 base size for crisp scaling

## HTML Reference
Update the HTML head section:
```html
<link rel="icon" type="image/x-icon" href="./favicon.ico" />
```

Or keep as SVG (modern browsers):
```html
<link rel="icon" type="image/svg+xml" href="./favicon.svg" />
```
