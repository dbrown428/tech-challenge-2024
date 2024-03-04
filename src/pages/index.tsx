import WelcomeMessage from "components/welcome";
import Layout from "components/layout";
import { useSignup } from "components/signup/use-signup";

export default function Welcome() {
  const { isOpen: isSignupOpen, open: openSignup } = useSignup()

  return (
    <Layout meta={{ title: "Welcome to Tech Challenge 2024 - Danica Brown"}}>
      <WelcomeMessage onSignup={openSignup} hide={isSignupOpen} />
    </Layout>
  )
}
