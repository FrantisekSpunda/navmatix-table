export type IconStyles = 'outlined' | 'round' | 'sharp' | 'two-tone' | 'filled'

export interface AddIcon {
  name: string
  type?: IconStyles
  activeName?: string
  activeType?: IconStyles
  className?: string
}
