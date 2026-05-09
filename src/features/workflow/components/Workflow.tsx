"use client";
import { EmptyView, EntityContaianer, EntityHeader, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { useRouter } from "next/navigation";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";

export const WorkflowList = ()=>{
    const workflows = useSuspenseWorkflows()

    return <div className="flex h-full items-center justify-center">
        <p>{JSON.stringify(workflows.data, null, 2)}</p>
    </div>
}

export const WorkflowHeader = ({disabled}:{disabled?:boolean}) => {
    const router = useRouter()
    const createWorkflow = useCreateWorkflow()
    const {handleError, modal} = useUpgradeModal()

    const handleCreate = ()=>{
        createWorkflow.mutate(undefined, {
            onSuccess:(data)=>{
                router.push(`/workflows/${data.id}`)
            },
            onError:(error)=>{
                handleError(error)
            }
        })
    }
  return (
    <>
    {modal}
      <EntityHeader
        title="Workflow"
        description="Create and manage workflows"
        onNew={handleCreate}
        newButtonLabel="New Workflow"
        isCreating={createWorkflow.isPending}
        disabled={disabled}
      />
    </>
  );
};

export const WorkflowSearch = ()=>{

    const [params, setParams] =  useWorkflowsParams()

    const {searchValue, onSearchChange} = useEntitySearch({params, setParams})

    return (
        <EntitySearch 
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Serch Workflow"
        />
    )
}

export const WorkflowPagination = ()=>{
    const workflows = useSuspenseWorkflows()
    const [params, setParams] = useWorkflowsParams()

    return (
      <EntityPagination
        page={workflows.data.page}
        totalPages={workflows.data.totalPaages}
        onPageChange={(page)=> {setParams({...params, page})}}
        disabled={workflows.isFetching}
      /> 
    )
}


export const WorkflowsLoading = ()=>{
  return <LoadingView message="Loading workflows...."/>
}

export const WorkflowsError = ()=>{
  return <ErrorView message="Error loading workflows"/>
}

export const WorkflowsEmpty = ()=>{
  const router = useRouter()
  const craeteWorkflow = useCreateWorkflow()
  const {handleError, modal} = useUpgradeModal()

   const handleCreate = ()=>{
        craeteWorkflow.mutate(undefined, {
            onError:(error)=>{
                handleError(error)
            },
            onSuccess:(data)=>{
                router.push(`/workflows/${data.id}`)
            },
        })}
    

  return (
    <>
    {modal}
      <EmptyView 
      onNew={handleCreate}
        message="You haven't created any workflow yet. Get started by creating your workflow"
      />
    </>
  )
}


export const WorkflowContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContaianer
      header={<WorkflowHeader />}
      search={<WorkflowSearch />}
      pagination={<WorkflowPagination />}
    >
      {children}
    </EntityContaianer>
  );
};
