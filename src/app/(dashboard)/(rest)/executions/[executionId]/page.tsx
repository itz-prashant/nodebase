interface ParamsProps {
    params: Promise<{
        executionId: string
    }>
}

const page = async({params}: ParamsProps) => {
  const {executionId} = await params  
  return (
    <div>
      Executions: {executionId}
    </div>
  )
}

export default page
