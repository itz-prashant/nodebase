"use client";
import { EntityContaianer, EntityHeader } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";

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

export const WorkflowContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContaianer
      header={<WorkflowHeader />}
      search={<p>Search</p>}
      pagination={<p>pagination</p>}
    >
      {children}
    </EntityContaianer>
  );
};
