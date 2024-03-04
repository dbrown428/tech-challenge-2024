import Link from "next/link";
import Item from "./item-base"

interface Properties {
  onClick: () => void
  children: any
}

/**
 * Instead of merging LinkItem and ActionItem together, I decided to keep
 * them separate so they are easier to reason about. Moved the common styles
 * into a separate component.
 */
export default function ActionItem(props: Properties) {
  return (
    <div onClick={props.onClick}>
      <Item>
        {props.children}
      </Item>
    </div>
  )
}
