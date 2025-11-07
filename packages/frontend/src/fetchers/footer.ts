import useSWR, { type SWRConfiguration } from 'swr'
import type { FooterData } from '@/types/footer'

const fetchFooter = async (): Promise<FooterData | null> => {
  const url = process.env.NEXT_PUBLIC_API_URL as string
  const query = `
    query Footer {
      footer {
        fundraisingID
        fundraisingDateString
        socialMediaLinks
        footerLinks
      }
    }
  `

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    const result = await response.json()

    if (result.errors) {
      console.error('GraphQL errors:', result.errors)
      return null
    }

    return result.data?.footer || null
  } catch (error) {
    console.error('Failed to fetch footer:', error)
    return null
  }
}

export const useFooter = (config?: SWRConfiguration) => {
  const { data, error, isLoading } = useSWR<FooterData | null>(
    ['footer'],
    fetchFooter,
    config
  )

  return {
    footer: data,
    isLoading,
    isError: error,
  }
}
