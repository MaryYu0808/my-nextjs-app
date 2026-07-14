interface LogoFallbackProps {
  size?: 'md' | 'lg'
}

export default function LogoFallback({ size = 'md' }: LogoFallbackProps) {
  const imageSize = size === 'lg' ? 'h-8 w-8' : 'h-6 w-6'

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(145deg, rgba(124,58,237,0.18), rgba(17,24,39,0.52))',
      }}
    >
      <img
        src="/imgs/company-logo.svg"
        alt="Company logo"
        className={`${imageSize} object-contain`}
        loading="lazy"
      />
    </div>
  )
}