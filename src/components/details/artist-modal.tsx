import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Artist } from "services/artsy"

interface Properties {
  onClose: () => void
  userName: string
  jobTitle: string
  artist?: Artist
}

export default function ArtistDetailsModal(props: Properties) {
  const isArtistSet = props.artist !== undefined
  const [aiDescription, setAiDescription] = useState<string | undefined>()
  
  function getAiDescription() {
    if (props.artist) {
      const data = JSON.stringify({
        artist: props.artist.name,
        username: props.userName,
        jobtitle: props.jobTitle,
      })
      fetch(`/api/artists/${props.artist.id}`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: data })
        .then(results => results.json())
        .then(data => setAiDescription(data.message))
        // should handle error, TODO:
    } else {
      setAiDescription(undefined)
    }
  }

  // Move to a use…
  useEffect(() => {
    getAiDescription()
  }, [props.artist])
  
  const artistDetails = props.artist && (
    <div key={`artist.${props.artist.id}`}>
      <p className='mb-4'>{props.artist.nationality}, {props.artist.year}</p>
      <h3 className='font-bold'>AI Fresh Take</h3>
      <p className='mb-6'>{aiDescription ?? 'Loading…'}</p>

      <h3 className='font-bold'>Description</h3>
      <p>{props.artist.description}</p>
    </div>
  )

  return (
    <Modal isOpen={isArtistSet} onClose={props.onClose} isCentered motionPreset="slideInBottom" scrollBehavior="inside" closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <div className='font-bold text-3xl text-blue-400'>{props.artist?.name ?? "Loading arist details"}</div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{artistDetails}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
