import { Users, GraduationCap, BookOpen } from "lucide-react"

const stats = [
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    value: "1.200+",
    label: "Alumni",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    value: "500+",
    label: "Santri",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    value: "350+",
    label: "Santriwati",
  },
]

export default function StatsOverlay() {
  return (
    <div className="container mx-auto px-4 relative -mt-16 z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4">
            <div className="flex-shrink-0">{stat.icon}</div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
