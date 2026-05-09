import { WorkflowContainer, WorkflowList } from "@/features/workflow/components/Workflow"
import { prefetchWorkflows } from "@/features/workflow/server/prefetch"
import { requireAuth } from "@/lib/auth-utils"
import { HydrateClient } from "@/trpc/server"
import { Suspense } from "react"
import {ErrorBoundary} from "react-error-boundary"
import type { SearchParams } from "nuqs/server"
import { workflowsParamsLoader } from "@/features/workflow/server/params-loader"

type Props = {
  searchParams : Promise<SearchParams>
}

const page = async ({searchParams}: Props) => {
  await requireAuth()

  const params = await workflowsParamsLoader(searchParams)
  prefetchWorkflows(params)

  return (
    <WorkflowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Error</p>}>
          <Suspense fallback={<p>Loading</p>}>
            <WorkflowList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowContainer>
  )
}

export default page
