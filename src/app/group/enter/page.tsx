import { SuccessComp } from "./_components/SuccessComp"

const Page = async () => {
	return (
		<div className="flex flex-col items-center justify-center p-8">
			<h1 className="text-2xl font-bold mb-4">Gruppe beitreten</h1>

			<div className="text-center mb-8">
				Gib den 6-stelligen Einladungscode ein, um der Gruppe beizutreten
			</div>

			<SuccessComp />
		</div>
	)
}

export default Page
