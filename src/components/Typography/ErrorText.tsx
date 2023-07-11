
interface Props {
  className?: string
  children: React.ReactNode
}
function ErrorText ({ className = '', children }: Props) {
  return (
    <p className={`text-center danger ${className} `}>{children}&nbsp;</p>
  )
}

export default ErrorText
