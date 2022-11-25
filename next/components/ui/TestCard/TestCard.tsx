export interface TestCardProps {
  title: string
  text: string
}

export const TestCard = ({ title, text }: TestCardProps) => {
  return (
    <div className="max-w-sm space-y-4 rounded border-2 border-category-600 p-4">
      <h3 className="font-bold">{title}</h3>
      <p className="text-p2">{text}</p>
    </div>
  )
}

export default TestCard
