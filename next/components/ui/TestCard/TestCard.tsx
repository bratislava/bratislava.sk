export interface TestCardProps {
  title: string
  text: string
}

export const TestCard = (props: TestCardProps) => {
  return (
    <div className="border-2 rounded border-primary p-4 space-y-4 max-w-sm">
      <h3 className="font-bold">{props.title}</h3>
      <p className="text-sm">{props.text}</p>
    </div>
  )
}

export default TestCard
