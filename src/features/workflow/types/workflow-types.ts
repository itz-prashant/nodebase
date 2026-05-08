export type EntityContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
}

export type EntityHeaderProps = {
  title: string
  description: string
  newButtonLabel: string
  disabled?: boolean
  isCreating?: boolean
} & (
  | {onNew: ()=> void, newButtonHref?: never}
  | {newButtonHref: string , onNew?: never}
  | {newButtonHref?: never , onNew?: never}
)

export type EntitySearchProps = {
  value: string
  onChange: (value: string)=> void
  placeholder?: string
}