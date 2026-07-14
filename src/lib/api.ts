const BASE_URL = 'https://ep.procurementai.ai/v1'

interface ApiResponse<T> {
  status: string
  data: T
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`)
  const json: ApiResponse<T> = await res.json()
  if (json.status !== 'SUCCESS') {
    const msg = `Request failed [${path}]: status = ${json.status}`
    alert(msg)
    throw new Error(msg)
  }
  return json.data
}
