import { ImageResponse } from 'next/og'

export const alt = 'Chase Fagen Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const blocks = [
  [true, true, true],
  [true, false, false],
  [true, true, true],
]

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'center',
        background: '#f4f2ed',
        color: '#080808',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          marginBottom: 42,
        }}
      >
        {blocks.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', gap: 16 }}>
            {row.map((filled, columnIndex) => (
              <div
                key={columnIndex}
                style={{
                  background: filled ? '#080808' : 'transparent',
                  display: 'flex',
                  height: 56,
                  width: 56,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          fontFamily: 'Arial, sans-serif',
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: -2,
          lineHeight: 1,
        }}
      >
        Chase Fagen
      </div>
      <div
        style={{
          display: 'flex',
          fontFamily: 'Arial, sans-serif',
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 8,
          marginTop: 22,
        }}
      >
        TRAVEL BLOG
      </div>
    </div>,
    size,
  )
}
