import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useApplicationData } from "components/use-data";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface Properties {
  open: boolean
  onClose: () => void
}

export default function SignupModal(props: Properties) {
  const scrollableDivRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { setData } = useApplicationData()
  const { handleSubmit, register, formState: { errors }} = useForm()
  const [slideIndex, setSlideIndex] = useState(0)

  /** Save form data to application */
  const submitForm = (values: any) => {
    if (isLastSlide()) {
      setData({ ...values, jobTitle: values.jobtitle })
      props.onClose()
      router.push('/art')
    } else {
      const newIndex = slideIndex + 1
      setSlideIndex(newIndex)
    }
  }

  const handleNext = () => handleSubmit(submitForm)()
  const isSlide = (index: number) => slideIndex === index

  const handleBack = () => {
    const newIndex = slideIndex - 1
    setSlideIndex(newIndex >= 0 ? newIndex : 0)
  }

  /** Using conditionals to register input fields is brittle and not a great idea, but here we are. */
  const slide1 = (
    <div>
      <p className='mb-4'>Please provide a username. This can be anything you would like, such as: your nick name, favourite character, legal name… etc.</p>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input type='text' autoComplete="off" {...(isSlide(0) ? register('username', { required: 'Username is required', minLength: { value: 2, message: 'Minimum length is 2' }}) : undefined)} />
        {/* Expand this to show the actual error message. */}
        {errors.username && <p className='text-red-500 italic text-sm pt-2'>Username is required.</p>}
      </FormControl>
    </div>
  )
  const slide2 = (
    <div>
      <p className='mb-4'>Please provide your job title. This could be engineer, doctor, dentist, teacher… etc.</p>
      <FormControl isRequired>
        <FormLabel>Job Title</FormLabel>
        <Input type='text' autoComplete="off" {...(isSlide(1) ? register('jobtitle', { required: 'Job title is required', minLength: { value: 2, message: 'Minimum length is 2' }}) : undefined)} />
        {errors.jobtitle && <p className='text-red-500 italic text-sm pt-2'>Job title is required.</p>}
      </FormControl>
    </div>
  )
  const slide3 = (
    <div>
      <div className='font-bold italic'>Congratulations, you can now enjoy the artist gallery.</div>
    </div>
  )
  const slides = [
    slide1,
    slide2,
    slide3,
  ]

  const isLastSlide = () => isSlide(slides.length - 1)

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
        <form>
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
        </form>
      </ModalContent>
    </Modal>
  )
}
