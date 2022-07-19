export interface TestCardProps {
  title: string
  text: string
}

export const TestCard = (props: TestCardProps) => {
  return (
    <div className="max-w-sm space-y-4 rounded border-2 border-primary p-4">
      <h3 className="font-bold">{props.title}</h3>
      <p className="text-sm">{props.text}</p>
    </div>
  )
}

export default TestCard
