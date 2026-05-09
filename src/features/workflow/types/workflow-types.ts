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

export interface EntityPaginationProps {
  page: number,
  onPageChange: (page:number)=> void
  totalPages: number
  disabled?: boolean
}

export interface StateViewProps {
  message?: string;
}

export interface EmptyViewProps extends StateViewProps {
  onNew?: () => void;
}

export interface EntityListProps<T>{
  items: T[]
  renderItem: (item:T, index: number)=> React.ReactNode
  getKey?: (item:T, index: number)=> string | number
  emptyView?: React.ReactNode;
  classname?: string
}

export interface EntityItemProps{
  href: string;
  title: string;
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  onRemove?: ()=> void | Promise<void>
  isRemoving?: boolean;
  className?:string;
}