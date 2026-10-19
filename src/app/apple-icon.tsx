import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function AppleIcon() {
  const fontData = await readFile(join(process.cwd(), 'src/app/_icon-assets/Inter-Bold.woff'))

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1E7A45',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ color: '#fff', fontFamily: 'Inter', fontSize: 110 }}>S</span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Inter', data: fontData, weight: 700, style: 'normal' }],
    }
  )
}
