import Link from "next/link"
import ActionItem from "./item-action"
import LinkItem from "./item-link"
import Style from "components/style"

/**
 * This is not a great way of doing this. This would probably need
 * to be moved out as more capabilities are added to the nav bar.
 */
interface Properties {
  action: Action
  translucent?: boolean
}

type Action = {
  label: string
  onClick: () => void
}

export default function Bar(props: Properties) {
  const isTranslucent = props.translucent ?? true
  const style = Style([
    'fixed top-0 left-0 right-0 bg-white z-20',
    isTranslucent ? 'bg-opacity-90' : 'bg-opacity-100',
  ])
  return (
    <div className={style}>
      <nav className='flex px-6 py-2 space-x-2 items-center'>
        <div className='font-bold text-2xl mr-6'><Link href='/'>DaVinci</Link></div>
        <LinkItem href='art'>Browse</LinkItem>
        <LinkItem href='https://github.com/dbrown428/tech-challenge-2024'>Code</LinkItem>
        <div className='grow'/>
        <ActionItem onClick={props.action.onClick}>{props.action.label}</ActionItem>
      </nav>
    </div>
  )
}
