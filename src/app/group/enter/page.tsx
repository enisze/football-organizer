import { SuccessComp } from "./_components/SuccessComp"

const Page = async () => {
	return (
		<div>
			<h1>Gruppe beitreten</h1>

			<div>
				Gib den 6-stelligen Einladungscode ein, um der Gruppe beizutreten
			</div>

			<SuccessComp />
		</div>
	)
}

export default Page
