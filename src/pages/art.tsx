import { ChevronRightIcon } from "@chakra-ui/icons";
import Layout from "components/layout";
import Image from "next/image";
import Link from "next/link";
import { Artist } from "services/artsy";
import { useEffect, useState } from "react";
import ArtistDetailsModal from "components/details/artist-modal";
import { useApplicationData } from "components/use-data";
import { useSignup } from "components/signup/use-signup";

export default function BrowseArt() {
  const { getData } = useApplicationData()
  const { open: openSignup } = useSignup()
  
  const userData = getData()
  const isAuthorized = userData !== undefined

  const [focalArtist, setFocalArist] = useState<Artist | undefined>()
  const [artists, setArtists] = useState<Artist[]>([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  /** Rather fragile, no client side schema validation or checking */
  function fetchArtistData() {
    setLoading(true)
    fetch('/api/artists')
      .then(results => results.json())
      .then(data => setArtists(data.artists))
      .catch(setError)
      .finally(() => setLoading(false))
  }

  /** 
   * When authorization changes, fetch artist data. This is not secure and not 
   * the proper way to do this but hopefully it's sufficient for this two hour 
   * time limit.
   */
  useEffect(() => {
    if (isAuthorized) {
      fetchArtistData()
    } else {
      // do nothing
    }
  }, [isAuthorized])
  
  return (
    <Layout meta={{ title: 'Browse Artists'}} dim>
      <div className='duration-200 w-full md:w-3/4 lg:w-2/3 lg:max-w-screen-md mt-10 mx-auto'>
        <h1 className='text-4xl font-bold text-white mb-3'>Artist Gallery</h1>
        <div className='bg-neutral-200 px-3 py-1 rounded-lg'>
          {error && <div className='bg-red-200 border border-red-500 p-6'>{error}</div>}
          {isLoading && <p className='font-bold text-xl'>Loading…</p>}
          {!isAuthorized && (
            // Given more time, would have liked to make this a page that "sells" the site, instead of
            // a silly warning message.
            <div className='bg-yellow-100 border border-yellow-400 p-6 my-6'>Please <span className='cursor-pointer font-bold hover:underline' onClick={openSignup}>signup</span> to enjoy AI commentary on popular artists.</div>
          )}

          <div>
            {artists.map((artist) => {
              const loadArtistDetails = () => setFocalArist(artist)
              return (
                <div key={`artwork.${artist.id}`}>
                  <div className='flex p-2 md:p-4 my-2 rounded-md hover:bg-blue-200 active:bg-blue-300 active:translate-y-1 duration-200 cursor-pointer space-x-4' onClick={loadArtistDetails}>
                    <div className='shrink-0 w-16 h-16 md:w-32 md:h-32 relative rounded-sm md:rounded-md overflow-hidden'>
                      <Image src={artist.image} alt={artist.name} fill sizes='10vw' className='object-cover' />
                    </div>
                    <div className='md:pt-3 select-none grow'>
                      <h3 className='text-lg md:text-2xl font-bold leading-tight'>{artist.name}</h3>
                      <p className='mb-4'>{artist.nationality}, {artist.year}</p>
                      <p>{artist.description.slice(0, 100)}…</p>
                    </div>
                    <div className='shrink-0 flex items-center'><ChevronRightIcon boxSize={6} /></div>
                  </div>
                  <hr className='border-neutral-300' />
                </div>
              )
            })}
            <p className='text-center p-4'>Artwork and data provided by <Link href="https://artsy.net/">Artsy</Link>. Commentary provided by <Link href="https://openai.com/">OpenAI</Link></p>
          </div>
        </div>
      </div>
      {userData && <ArtistDetailsModal
        artist={focalArtist}
        userName={userData.username}
        jobTitle={userData.jobTitle}
        onClose={() => setFocalArist(undefined)}
      />}
    </Layout>
  )
}
