# DragDropImagePlugin

A Lexical plugin that enables drag & drop functionality for uploading images directly into the editor.

## User Flow

```
1. User drags a local image file onto the editor
   ↓
2. Plugin validates the file (MIME type, file size)
   ├─ Invalid? → Show error message and stop
   └─ Valid? → Proceed to upload
   ↓
3. CMS returns: { url: "image URL", title?: "image name" }
   ↓
4. Insert image node with:
   - URL from server
   - Title from server (if provided)
   - Default layout: 'default'
   - Empty caption: ''
   - Source: 'drag-drop'
   ↓
5. In edit dialog:
   - Title field is read-only (shows server-returned title)
   - URL field is hidden (can't edit uploaded image reference)
   - Caption and layout remain editable
```

## Features

- **Automatic Upload:** Drag images directly into editor without manual URL entry
- **File Validation:** Validates MIME type and file size before upload
- **Progress Feedback:** Shows loading skeleton during upload
- **Error Handling:** Customizable error callbacks for upload failures
- **Cancellation:** Aborts in-flight uploads when component unmounts
- **Image Metadata:** Displays server-returned image title (read-only)

## Configuration

To enable drag-drop image upload, pass an `uploadImage` configuration to the editor:

```typescript
import type { EditorConfig } from '@twreporter/lexical-editor/core'

const config: EditorConfig = {
  // ... other config
  uploadImage: {
    handler: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) throw new Error('Upload failed')
      
      const data = await response.json()
      return {
        url: data.imageUrl,           // Required: where image is stored
        title: data.imageName          // Optional: display name
      }
    },
    
    // Optional validation function
    validate: (file: File) => {
      if (file.size > 50 * 1024 * 1024) {
        return { valid: false, error: 'File too large' }
      }
      return { valid: true }
    },
    
    // Optional: max file size in bytes (default: 5MB)
    maxFileSize: 10 * 1024 * 1024,
    
    // Optional: allowed MIME types (default: common image types)
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    
    // Optional: error handling callback
    onError: (error) => {
      console.error('Upload failed:', error.message)
      showErrorNotification(error.message)
    }
  }
}
```

## API

### UploadImageConfig

```typescript
type UploadImageConfig = {
  /**
   * Async handler to upload a file
   * @param file - The image file to upload
   * @returns Promise resolving to { url, title? }
   */
  handler: (file: File) => Promise<{ url: string; title?: string }>
  
  /**
   * Optional validation function to check if file is allowed
   * @param file - The image file to validate
   * @returns { valid: boolean; error?: string }
   */
  validate?: (file: File) => { valid: boolean; error?: string }
  
  /**
   * Maximum file size in bytes (default: 5MB / 5242880)
   */
  maxFileSize?: number
  
  /**
   * Allowed MIME types (default: common image types)
   * @example ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
   */
  allowedMimeTypes?: string[]
  
  /**
   * Error callback for handling upload failures
   * @param error - The error that occurred
   */
  onError?: (error: Error) => void
}
```

## Defaults

- **Max File Size:** 5MB (5242880 bytes)
- **Allowed MIME Types:** 
  - image/jpeg
  - image/png
  - image/webp
  - image/gif
  - image/svg+xml

## Error Handling

The plugin handles various error scenarios:

| Scenario | Behavior |
|----------|----------|
| Invalid MIME type | Silently filtered; no error shown |
| File size exceeded | Error message shown via `onError` or `alert()` |
| Validation fails | Error message shown via `onError` or `alert()` |
| Upload handler throws | Error caught and passed to `onError` callback |
| Component unmounts during upload | Upload aborted gracefully; no resources leak |

## Integration

The plugin is automatically integrated when `config.uploadImage` is provided:

```typescript
import { LexicalEditor } from '@twreporter/lexical-editor'

export function MyEditor() {
  const config = { /* ... with uploadImage ... */ }
  return <LexicalEditor config={config} />
}
```

If `uploadImage` is not provided, the plugin won't render and drag-drop will be disabled.

## Behavior

### Image Insertion
- Images are inserted at the current selection point
- Multiple drops are processed sequentially
- Each image creates a separate node

### Edit Dialog
Uploaded images show different fields than manually-added images:

**Uploaded image (source: 'drag-drop'):**
- ✅ Title field (read-only)
- ❌ URL field (hidden)
- ✅ Caption (editable)
- ✅ Layout (editable)

**Manual image (source: 'link'):**
- ❌ Title field (not shown)
- ✅ URL field (editable)
- ✅ Caption (editable)
- ✅ Layout (editable)

### Serialization
Both uploaded and manual images are persisted with their source type:

```json
{
  "type": "imageLink-content",
  "version": 1,
  "imageUrl": "/images/photo.jpg",
  "imageLayout": "default",
  "caption": "Photo caption",
  "imageTitle": "Photo Name",
  "imageSource": "drag-drop"
}
```

## Browser Support

Requires browser support for:
- Drag and Drop API
- File API
- Fetch API (for upload handler)
- AbortController (for cancellation)

## Accessibility

- Drop zones are announced to screen readers
- Error messages are displayed clearly
- Focus management preserved during upload
- Keyboard accessible edit dialogs

## Performance

- Uploads happen asynchronously outside editor state
- UI remains responsive during file upload
- Event listeners cleaned up on unmount
- No memory leaks from abort controller
