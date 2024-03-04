import { createContext, useContext, useState } from "react";

type SignupActions = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const SignupContext = createContext<SignupActions | null>(null)

export function SignupProvider(props: { children: any }) {
  const [open, setOpen] = useState(false)

  const actions: SignupActions = {
    isOpen: open,
    open: () => setOpen(true),
    close: () => setOpen(false),
  }

  return (
    <SignupContext.Provider value={actions}>
      {props.children}
    </SignupContext.Provider>
  )
}

export function useSignup() {
  const context = useContext(SignupContext)
  if (context) {
    return context
  } else {
    throw new Error('useSignup must be inside a SignupProvider.')
  }
}
