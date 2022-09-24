import { Flag, FlagNameValues } from "semantic-ui-react"

type Props = {
	currencyCode: string
	className?: string
}
const CurrencyFlag = ({ currencyCode, className }: Props) => {
	return (
		<Flag
			name={currencyCode.slice(0, 2).toLocaleLowerCase() as FlagNameValues}
			className={className}
		/>
	)
}

export default CurrencyFlag
