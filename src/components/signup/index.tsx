import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useApplicationData } from "components/use-data"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"

interface Properties {
  open: boolean
  onClose: () => void
}

export default function SignupModal(props: Properties) {
  const router = useRouter()
  const { setData } = useApplicationData()
  const scrollableDivRef = useRef<HTMLDivElement>(null)
  const [slideIndex, setSlideIndex] = useState(0)

  const steps = [
    { title: 'Identity', description: 'Username' },
    { title: 'Job', description: 'Position' },
    { title: 'Review', description: '' },
  ]

  const hasUsernameError = true // temp
  const hasJobTitleError = true // temp
  
  const handleNext = () => {
    // validate appropriate form based on step.
    
    
    if (isLastSlide()) {
      setData({ username: 'Danica', jobTitle: 'Software Engineer' })
      props.onClose()
      router.push('/art')
    } else {
      // Validate form, increment on valid
      setSlideIndex(slideIndex + 1)
    }
  }

  const handleBack = () => setSlideIndex(slideIndex - 1)

  const slide1 = (
    <form id='slide_1'>
      <p className='mb-4'>Please provide a username. This can be anything you would like, such as: your nick name, favourite character, legal name… etc.</p>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input type='text' />
        {hasUsernameError && <FormErrorMessage>Username is required.</FormErrorMessage>}
      </FormControl>
    </form>
  )
  const slide2 = (
    <form id='slide_2'>
      <p className='mb-4'>Please provide your job title. This could be engineer, doctor, dentist, teacher… etc.</p>
      <FormControl isRequired>
        <FormLabel>Job Title</FormLabel>
        <Input type='text' />
        {hasJobTitleError && <FormErrorMessage>Job title is required.</FormErrorMessage>}
      </FormControl>
    </form>
  )
  const slide3 = (
    <div id='slide_3'>
      <div className=''>Congratulations, you can now enjoy the artist gallery.</div>
    </div>
  )
  const slides = [
    slide1,
    slide2,
    slide3,
  ]

  const isLastSlide = () => slideIndex === slides.length - 1

  useEffect(() => {
    if (scrollableDivRef.current) {
      const width = Math.round(scrollableDivRef.current.scrollWidth / slides.length)
      scrollableDivRef.current.scrollLeft = width * slideIndex
    }
  }, [slideIndex])

  return (
    <Modal isOpen={props.open} onClose={props.onClose} isCentered motionPreset="slideInBottom" scrollBehavior="inside" closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Signup</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className='overflow-hidden relative snap-mandatory snap-x' ref={scrollableDivRef}>
            <div className='flex flex-row' style={{ width: `calc(100%*${slides.length})` }}>
              {slides.map((slide, index) => (
                <div key={`slide.${index}`} className='w-full snap-always snap-center'>{slide}</div>)
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {slideIndex > 0 && <Button colorScheme='gray' mr={3} onClick={handleBack}>Back</Button>}
          <Button colorScheme='green' onClick={handleNext}>{isLastSlide() ? 'Done' : 'Next'}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
