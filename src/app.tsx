import './app.css'
import ButtonOne from './component/button'

export function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <ButtonOne text="Get Started " stars={20} />
    </div>
  )
}
