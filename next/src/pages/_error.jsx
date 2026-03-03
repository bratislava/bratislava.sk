import NextErrorComponent from 'next/error'

// eslint-disable-next-line react/prop-types
const MyError = ({ statusCode }) => {
  return <NextErrorComponent statusCode={statusCode} />
}

MyError.getInitialProps = async (context) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps(context)

  errorInitialProps.hasGetInitialPropsRun = true

  return errorInitialProps
}

export default MyError
