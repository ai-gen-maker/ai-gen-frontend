const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3004'
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1초
const REQUEST_TIMEOUT = 30000 // 30초

interface FetchOptions extends RequestInit {
  retries?: number
  timeout?: number
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
  }

  private async fetchWithRetry(
    url: string,
    options: FetchOptions = {}
  ): Promise<Response> {
    const { retries = MAX_RETRIES, timeout = REQUEST_TIMEOUT, ...fetchOptions } = options

    for (let i = 0; i <= retries; i++) {
      try {
        // 타임아웃 처리
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), timeout)

        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        // 서버 에러 시 재시도
        if (response.status >= 500 && i < retries) {
          console.log(`Retry ${i + 1}/${retries} for ${url}`)
          await this.delay(RETRY_DELAY * (i + 1))
          continue
        }

        return response
      } catch (error) {
        if (i === retries) {
          console.error(`Failed after ${retries} retries:`, error)
          throw error
        }
        console.log(`Retry ${i + 1}/${retries} after error`)
        await this.delay(RETRY_DELAY * (i + 1))
      }
    }

    throw new Error('Max retries exceeded')
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async get(endpoint: string, options?: FetchOptions): Promise<any> {
    const response = await this.fetchWithRetry(
      `${this.baseUrl}${endpoint}`,
      { ...options, method: 'GET' }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`API Error: ${response.status} - ${error}`)
    }

    return response.json()
  }

  async post(endpoint: string, data: any, options?: FetchOptions): Promise<any> {
    const response = await this.fetchWithRetry(
      `${this.baseUrl}${endpoint}`,
      {
        ...options,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: JSON.stringify(data),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`API Error: ${response.status} - ${error}`)
    }

    return response.json()
  }

  getStreamUrl(endpoint: string, params: URLSearchParams): string {
    return `${this.baseUrl}${endpoint}?${params}`
  }

  // 헬스체크
  async healthCheck(): Promise<boolean> {
    try {
      await this.get('/api/health', { retries: 1, timeout: 5000 })
      return true
    } catch {
      return false
    }
  }
}

export const apiClient = new ApiClient(BACKEND_URL)
