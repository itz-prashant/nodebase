interface ParamsProps {
    params: Promise<{
        credentialId: string
    }>
}

const page = async({params}: ParamsProps) => {
  const {credentialId} = await params  
  return (
    <div>
      Credential: {credentialId}
    </div>
  )
}

export default page
