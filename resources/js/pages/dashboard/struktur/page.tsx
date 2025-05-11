"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, Phone } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import StrukturCreateModal from "@/components/struktur-create-modal"

// Sample data for struktur organisasi
const strukturData = [
  {
    id: "1",
    nama: "KH. Ahmad Fauzi",
    posisi: "Pengasuh Pondok",
    no_hp: "081234567890",
    foto: "/placeholder.svg?height=100&width=100",
    departemen: "Pimpinan",
  },
  {
    id: "2",
    nama: "Ustadz Abdul Rahman",
    posisi: "Kepala Madrasah",
    no_hp: "081234567891",
    foto: "/placeholder.svg?height=100&width=100",
    departemen: "Pendidikan",
  },
  {
    id: "3",
    nama: "Ustadz Mahmud Hasan",
    posisi: "Sekretaris Pondok",
    no_hp: "081234567892",
    foto: "/placeholder.svg?height=100&width=100",
    departemen: "Administrasi",
  },
  {
    id: "4",
    nama: "H. Budi Santoso",
    posisi: "Bendahara",
    no_hp: "081234567893",
    foto: "/placeholder.svg?height=100&width=100",
    departemen: "Keuangan",
  },
  {
    id: "5",
    nama: "Ustadzah Siti Aminah",
    posisi: "Kepala Asrama Putri",
    no_hp: "081234567894",
    foto: "/placeholder.svg?height=100&width=100",
    departemen: "Asrama",
  },
  {
    id: "6",
    nama: "Ustadz Rizki Pratama",
    posisi: "Kepala Asrama Putra",
    no_hp: "081234567895",
    foto: "/placeholder.svg?height=100&width=100",
    departemen: "Asrama",
  },
  {
    id: "7",
    nama: "Ustadz Anwar Ibrahim",
    posisi: "Koordinator Tahfidz",
    no_hp: "081234567896",
    foto: "/placeholder.svg?height=100&width=100",
    departemen: "Pendidikan",
  },
  {
    id: "8",
    nama: "Ustadzah Fatimah Az-Zahra",
    posisi: "Koordinator Kegiatan",
    no_hp: "081234567897",
    foto: "/placeholder.svg?height=100&width=100",
    departemen: "Kegiatan",
  },
]

export default function StrukturPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter struktur berdasarkan nama
  const filteredStruktur = strukturData.filter((struktur) =>
    struktur.nama.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Format phone number
  const formatPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3")
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Get department badge color
  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Pimpinan":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "Pendidikan":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Administrasi":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Keuangan":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Asrama":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "Kegiatan":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Struktur Organisasi</h1>
        <StrukturCreateModal />
      </div>

      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-medium">Daftar Pengurus</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Cari pengurus..."
                  className="w-full md:w-[250px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Foto</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Posisi</TableHead>
                <TableHead>Departemen</TableHead>
                <TableHead>Nomor HP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStruktur.map((struktur) => (
                <TableRow key={struktur.id}>
                  <TableCell>
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={struktur.foto || "/placeholder.svg"} alt={struktur.nama} />
                      <AvatarFallback>{getInitials(struktur.nama)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{struktur.nama}</TableCell>
                  <TableCell>{struktur.posisi}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getDepartmentColor(struktur.departemen)}>
                      {struktur.departemen}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-gray-500" />
                      <a href={`tel:${struktur.no_hp}`} className="hover:underline">
                        {formatPhoneNumber(struktur.no_hp)}
                      </a>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
