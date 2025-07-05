import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleTouchIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: '100px',
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '20px',
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
