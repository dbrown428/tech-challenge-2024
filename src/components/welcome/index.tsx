import { Button } from "@chakra-ui/react"
import Style from "components/style"
import { useApplicationData } from "components/use-data"
import { website } from "config/links"
import { useRouter } from "next/router"

interface Properties {
  onSignup: () => void
  hide?: boolean
}

/**
 * It's unlikely that this component will be used in multiple places, but
 * I decided to put all code related to the welcome message in one place
 * to cleanup the main page.
 */
export default function WelcomeMessage(props: Properties) {
  const router = useRouter()
  const { isSignedUp } = useApplicationData()
  const hide = props.hide ?? false
  
  const style = Style([
    'w-full sm:w-2/3 lg:w-2/5 xl:w-1/3 duration-200 mx-auto mt-16',
    hide ? 'opacity-0' : 'opacity-100',
  ])

  const startBrowsing = () => router.push('/art')
  const actionButton = isSignedUp ? 
    <Button onClick={startBrowsing} colorScheme='green'>Browse Artists</Button> :
    <Button onClick={props.onSignup} colorScheme='blue'>Sign up</Button>

  return (
    <div className={style}>
      <h1 className='hidden'>Welcome</h1>
      <img src='/img/welcome.svg' className='w-3/4 h-auto duration-200 mb-4 -rotate-12 -translate-x-8'/ >
      <div className='bg-black bg-opacity-70 p-6 rounded-lg'>
        <p className='text-white text-4xl mb-2'>Tech challenge 2024</p>
        <p className='text-white text-lg mb-10'>Browse popular human artists with AI commentary.</p>
        <p className='text-white text-lg mb-2 text-opacity-80'>Unfortunately I went over the recommended time because I did not have experience with ChakraUI, Apollo, and GraphQL; it took me longer than anticipated to get acquainted with those tools.</p>
        <p className='text-lg mb-10'><a href={website} target="_blank" title='Visit my website' className='text-white text-opacity-80 hover:text-opacity-100 duration-200 hover:underline'>Danica</a></p>
        {actionButton}
      </div>
    </div>
  )
}
