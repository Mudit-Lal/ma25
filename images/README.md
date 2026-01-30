# Media Organization Guide

This folder contains three categories of media for the post-event website:

## Folder Structure

```
images/
├── event-photos/       # Generic celebration photos (everyone, candid moments, groups)
│   ├── full/           # Original high-res images (max 1920px width, JPEG 85% quality, <500KB)
│   ├── thumbnails/     # Grid thumbnails (400x400px, center-cropped, JPEG 80% quality, <50KB)
│   └── captions.json   # Bilingual metadata for event photos
│
├── stage-photos/       # Formal stage photos (couple, family on stage, ceremonies)
│   ├── full/           # Original high-res images
│   ├── thumbnails/     # Grid thumbnails
│   └── captions.json   # Bilingual metadata for stage photos
│
└── videos/             # Event videos & reels (short format recommended)
    ├── full/           # Video files (MP4 format, H.264 codec, max 1080p)
    ├── thumbnails/     # Video poster images (400x400px, JPEG)
    └── captions.json   # Bilingual metadata for videos
```

## How to Add Media

### 1. Event Photos
- Select generic celebration photos (candid moments, groups, guests)
- Rename sequentially: `001.jpg`, `002.jpg`, `003.jpg`, etc.
- Place originals in `event-photos/full/`
- Create 400x400px thumbnails and place in `event-photos/thumbnails/`
- Update `event-photos/captions.json` with entry for each image

### 2. Stage Photos
- Select formal stage photos (couple on stage, ceremonies, cake cutting)
- Rename sequentially: `001.jpg`, `002.jpg`, `003.jpg`, etc.
- Place originals in `stage-photos/full/`
- Create 400x400px thumbnails and place in `stage-photos/thumbnails/`
- Update `stage-photos/captions.json` with entry for each image

### 3. Videos
- Select videos/reels (highlights, wishes, short clips)
- Convert to MP4 format (H.264 codec recommended)
- Rename sequentially: `001.mp4`, `002.mp4`, `003.mp4`, etc.
- Place videos in `videos/full/`
- Extract or create poster image (400x400px) and place in `videos/thumbnails/`
- Update `videos/captions.json` with entry for each video

## Image Optimization Tips

**For Photos:**
- Use online tools like TinyPNG, Squoosh, or ImageOptim
- Full-size: Max 1920px width, 85% quality, target <500KB per image
- Thumbnails: 400x400px square, center-cropped, 80% quality, target <50KB

**For Videos:**
- Use HandBrake or FFmpeg for compression
- Format: MP4 (H.264)
- Resolution: Max 1080p
- Optimize for web (reasonable bitrate, not too large)

**Thumbnail Generation:**
- For photos: Use any image editor (Photoshop, GIMP, online tools)
- For videos: Extract a representative frame or create custom poster

## Captions.json Format

Each category has its own `captions.json` file with bilingual metadata.

**For Photos (event-photos and stage-photos):**
```json
{
  "images": [
    {
      "id": "001",
      "alt": {
        "en": "Description in English",
        "hi": "हिंदी में विवरण"
      },
      "caption": {
        "en": "English caption for lightbox",
        "hi": "लाइटबॉक्स के लिए हिंदी कैप्शन"
      }
    }
  ]
}
```

**For Videos:**
```json
{
  "videos": [
    {
      "id": "001",
      "alt": {
        "en": "Description in English",
        "hi": "हिंदी में विवरण"
      },
      "caption": {
        "en": "English caption for lightbox",
        "hi": "लाइटबॉक्स के लिए हिंदी कैप्शन"
      },
      "duration": "00:45"
    }
  ]
}
```

## Notes

- **File naming:** Use sequential numbers (001, 002, 003...) that match across full/thumbnails and captions.json
- **IDs in captions.json:** Must match filename without extension (e.g., "001" for 001.jpg)
- **Bilingual:** All captions must have both English and Hindi versions
- **Video duration:** Optional field in format "MM:SS" or "HH:MM:SS"
- **Order:** Media will appear in the order specified in captions.json

## Recommended Media Count

- **Event Photos:** 20-50 images
- **Stage Photos:** 10-30 images
- **Videos:** 3-10 videos (keep them short, under 3 minutes ideal)
