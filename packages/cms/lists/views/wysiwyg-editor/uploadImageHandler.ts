/**
 * Generate image title in format: <filename>-yyyymmdd-<random 5 digit number>
 * @param filename - Original filename from the File
 * @returns Formatted image title
 */
function generateImageTitle(filename: string): string {
  // Get current date in yyyymmdd format
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const dateStr = `${year}${month}${day}`

  // Generate random 5 digit number
  const randomNum = String(Math.floor(Math.random() * 100000)).padStart(5, '0')

  // Extract filename without extension
  const nameWithoutExt = filename.split('.').slice(0, -1).join('.')

  return `${nameWithoutExt}-${dateStr}-${randomNum}`
}

/**
 * Upload image to CMS Photo list via GraphQL API
 * @param file - Image file to upload
 * @returns Promise with uploaded image URL and title
 */
export async function uploadImageHandler(
  file: File
): Promise<{ url: string; title: string }> {
  try {
    const imageTitle = generateImageTitle(file.name)

    // Create FormData for GraphQL multipart file upload
    const formData = new FormData()
    
    const query = `
      mutation CreatePhoto($data: PhotoCreateInput!) {
        createPhoto(data: $data) {
          id
          name
          imageFile {
            url
          }
        }
      }
    `

    formData.append('operations', JSON.stringify({
      query,
      variables: {
        data: {
          name: imageTitle,
          imageFile: {
            upload: null, // Will be replaced with file
          },
        },
      },
    }))

    formData.append('map', JSON.stringify({
      '0': ['variables.data.imageFile.upload'],
    }))

    formData.append('0', file)

    // Call CMS GraphQL API
    // In Keystone admin UI, the GraphQL endpoint is typically at /api/graphql
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'apollo-require-preflight': 'true',
      },
      body: formData,
      credentials: 'include', // Include cookies for authentication
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }

    const data = await response.json()

    // Check for GraphQL errors
    if (data.errors && data.errors.length > 0) {
      const errorMessage = data.errors
        .map((e: any) => e.message || JSON.stringify(e))
        .join('; ')
      throw new Error(`GraphQL error: ${errorMessage}`)
    }

    // Extract image URL from response
    const imageUrl = data.data?.createPhoto?.imageFile?.url
    if (!imageUrl) {
      throw new Error('No image URL returned from server')
    }

    return {
      url: imageUrl,
      title: imageTitle,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Image upload failed: ${errorMessage}`)
  }
}
