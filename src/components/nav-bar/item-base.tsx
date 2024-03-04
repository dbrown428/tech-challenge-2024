interface Properties {
  children: any
}

/**
 * This is just a simple component that contains style used by multiple item
 * components.
 */
export default function Item(props: Properties) {
  const style = 'py-1.5 px-4 cursor-pointer hover:bg-blue-400 hover:text-white active:bg-blue-500 duration-200 rounded-md'
  return <div className={style}>{props.children}</div>
}
