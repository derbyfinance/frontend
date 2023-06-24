import { AlignType } from '@datatypes/AlignType'

export default interface TableHeaderModel {
	name: string
	align?: AlignType
	colspan?: number
}
