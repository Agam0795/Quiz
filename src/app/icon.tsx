import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: '24px',
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '6px',
        }}
      >
        🎓
      </div>
    ),
    {
      ...size,
    }
  )
}
