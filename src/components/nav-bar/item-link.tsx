import Link from "next/link";
import Item from "./item-base"

interface Properties {
  href: string
  children: any
  newWindow?: boolean
}

/**
 * Instead of merging LinkItem and ActionItem together, I decided to keep
 * them separate so they are easier to reason about. Moved the common styles
 * into a separate component.
 */
export default function LinkItem(props: Properties) {
  const newWindow = props.newWindow ?? false
  return (
    <Link href={props.href} target={newWindow ? '_blank' : '_self'}>
      <Item>
        {props.children}
      </Item>
    </Link>
  )
}
