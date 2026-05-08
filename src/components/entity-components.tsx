import { EntityContainerProps, EntityHeaderProps, EntitySearchProps } from "@/features/workflow/types/workflow-types";
import { Button } from "./ui/button";
import { PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";

export const EntityHeader = ({
  title,
  description,
  newButtonLabel,
  onNew,
  newButtonHref,
  isCreating,
  disabled
}: EntityHeaderProps)=>{
  return (
    <div className="flex items-center justify-between flex-row gap-x-4">
    <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        {description && (
          <p className="text-xs md:text-sm text-muted-foreground">
            {description}
          </p>
        )}
    </div>
    {onNew && !newButtonHref && (
        <Button disabled={isCreating || disabled} size={"lg"} onClick={onNew}>
          <PlusIcon className="size-4" />
          {newButtonLabel}
        </Button>
      )}
      {newButtonHref && !onNew && (
        <Button size={"sm"} asChild>
          <Link href={newButtonHref} prefetch>
            {newButtonLabel}
          </Link>
        </Button>
      )}
  </div>
  )
}

export const EntitySearch = ({
  value,
  onChange,
  placeholder
}:EntitySearchProps)=>{
  return (
    <div className="relative ml-auto">
      <SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="max-w-[200px] bg-background shadow-none border-border pl-8"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export const EntityContaianer = ({
  children,
  header,
  search,
  pagination,
}: EntityContainerProps) => {
  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col gap-y-8 h-full">
        {header}

        <div className="flex flex-col gap-y-4 h-full">
          {search}
          {children}
        </div>
        {pagination}
      </div>
    </div>
  );
};
