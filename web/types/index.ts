// Helpers
// https://github.com/microsoft/TypeScript/pull/40336
import { aspect as themeAspect } from 'styles/themes/defaultTheme'
import { BreakpointKeys } from 'styles/utilities/breakpointsFactory'
import { transitions } from 'utils/animation'

export type FlexBoxAlignItems =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch'

export type FlexBoxJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'

export type BorderProps =
  | 'border'
  | 'border-top'
  | 'border-right'
  | 'border-bottom'
  | 'border-left'

export type NormalizedNumber =
  | 0
  | 0.05
  | 0.1
  | 0.15
  | 0.2
  | 0.25
  | 0.3
  | 0.35
  | 0.4
  | 0.45
  | 0.5
  | 0.55
  | 0.6
  | 0.65
  | 0.7
  | 0.75
  | 0.8
  | 0.85
  | 0.9
  | 0.95
  | 1

export type Cloudinary = {
  aspectRatio: number
  public_id: string
  format: string
  type: string
  bytes?: number
  created_at?: string
  duration?: number
  height?: number
  width?: number
  metadata?: string[]
  resource_type?: string
  secure_url?: string
  tags?: string[]
  url?: string
  version?: string
  aspect_ratio?: number
  alt?: string
}

type nest = 'image' | 'cldImage'

export type CloudinaryNode = Cloudinary & { [key in nest]?: Cloudinary }

export type aspectItem = keyof typeof themeAspect | number

export type aspect = Partial<Record<BreakpointKeys, aspectItem>> | aspectItem

export type transitions = keyof typeof transitions
