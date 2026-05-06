interface ParamsProps {
    params: Promise<{
        workflowId: string
    }>
}

const page = async({params}: ParamsProps) => {
  const {workflowId} = await params  
  return (
    <div>
      Credential: {workflowId}
    </div>
  )
}

export default page
