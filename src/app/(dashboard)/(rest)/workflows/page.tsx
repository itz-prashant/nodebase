import { requireAuth } from "@/lib/auth-utils"

const page = async () => {

  await requireAuth()
  return (
    <div>
      Workflows
    </div>
  )
}

export default page
