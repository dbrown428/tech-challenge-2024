import NavBar from "./nav-bar";
import backgroundImage from "@/public/img/mechanis_1.jpeg";
import Image from 'next/image';
import Style from "./style";
import { website } from "config/links";
import SignupModal from "./signup";
import { useApplicationData } from "./use-data";
import Head from "next/head";
import { useSignup } from "./signup/use-signup";

interface Properties {
  children: any
  meta: Meta
  dim?: boolean
}

// Could have used the new App Router meta setup.
type Meta = {
  title: string
}

export default function Layout(props: Properties) {
  const { isSignedUp, clearData } = useApplicationData()
  const { isOpen: isSignupOpen, open: openSignup, close: closeSignup } = useSignup()
  
  const isDark = props.dim ?? false
  const bgStyle = Style([
    'fixed inset-0 z-0 duration-200',
    isDark ? 'opacity-20' : 'opacity-80'
  ])

  /** The logout should be the place where you edit the account data, but I can't finish due to time constraints. */
  const actionButton = isSignedUp ? {
    label: 'Logout',
    onClick: () => clearData()
  } : {
    label: 'Signup',
    onClick: () => openSignup()
  }

  return (
    <>
      <Head>
        <title>{props.meta.title}</title>
      </Head>
      <div className='h-screen'>
        <NavBar action={actionButton} translucent={!isDark} />
        <div className='relative z-10 p-3 md:p-6 pt-12 md:pt-20'>
          <main className='mb-6'>
            {props.children}
          </main>
          <footer>
            <p className='font-light text-white text-opacity-60 text-center mx-auto w-fit'>Made with love by <a href={website} className='font-bold hover:underline' target="_blank">Danica Brown</a></p>
          </footer>
        </div>
        <div className={bgStyle}>
          <Image src={backgroundImage} alt='Leonardo DaVinci inspired AI artwork with bright colours and swirls' sizes='100vw' className='object-cover object-center w-full h-full scale-125' />
        </div>
      </div>
      <SignupModal open={isSignupOpen} onClose={closeSignup} />
    </>
  )
}
