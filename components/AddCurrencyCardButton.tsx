import { css, Theme } from "@emotion/react"
import { Button } from "semantic-ui-react"
import useSearchStore from "store/search"

const AddCurrencyCardButton = () => {
	const { showForm } = useSearchStore()

	return (
		<div css={controlStyles}>
			<Button
				icon="plus"
				size="massive"
				onClick={showForm}
				css={addCardButtonStyles}
			/>
		</div>
	)
}

const controlStyles = ({ colors, sizes }: Theme) => css`
	position: relative;
	width: ${sizes.control.cardWidth};
	height: ${sizes.control.cardHeight};
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 6px;
	background-color: ${colors.control.cardBg};
	background-image: repeating-linear-gradient(
			0deg,
			${colors.control.cardBorder},
			${colors.control.cardBorder} 30px,
			transparent 30px,
			transparent 41px,
			${colors.control.cardBorder} 41px
		),
		repeating-linear-gradient(
			90deg,
			${colors.control.cardBorder},
			${colors.control.cardBorder} 30px,
			transparent 30px,
			transparent 41px,
			${colors.control.cardBorder} 41px
		),
		repeating-linear-gradient(
			180deg,
			${colors.control.cardBorder},
			${colors.control.cardBorder} 30px,
			transparent 30px,
			transparent 41px,
			${colors.control.cardBorder} 41px
		),
		repeating-linear-gradient(
			270deg,
			${colors.control.cardBorder},
			${colors.control.cardBorder} 30px,
			transparent 30px,
			transparent 41px,
			${colors.control.cardBorder} 41px
		);
	background-size: 4px 100%, 100% 4px, 4px 100%, 100% 4px;
	background-position: 0 0, 0 0, 100% 0, 0 100%;
	background-repeat: no-repeat;
	&:hover {
		opacity: 0.75;
	}
`
const addCardButtonStyles = ({ sizes }: Theme) => css`
	width: ${sizes.control.cardWidth};
	height: ${sizes.control.cardHeight};
	margin: 0 !important;
	background: transparent !important;
	&:hover {
		opacity: 0.5;
	}
`

export default AddCurrencyCardButton
