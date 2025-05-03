"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Data provinsi, kabupaten, kecamatan, dan desa (contoh data)
const provinsiData = ["Jawa Barat", "Jawa Tengah", "Jawa Timur", "DKI Jakarta", "Banten"]
const kabupatenData = ["Bandung", "Bogor", "Bekasi", "Depok", "Tangerang"]
const kecamatanData = ["Cilandak", "Jagakarsa", "Pancoran", "Pasar Minggu", "Tebet"]
const desaData = ["Cipete Selatan", "Gandaria Selatan", "Pondok Labu", "Ragunan", "Tanjung Barat"]

interface DataDiriFormProps {
  form: UseFormReturn<any>
}

export function DataDiriForm({ form }: DataDiriFormProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="nik"
        render={({ field }) => (
          <FormItem>
            <FormLabel>NIK</FormLabel>
            <FormControl>
              <Input placeholder="Masukkan NIK 16 digit" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="namaLengkap"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama Lengkap</FormLabel>
            <FormControl>
              <Input placeholder="Masukkan nama lengkap" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="tempatLahir"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tempat Lahir</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan tempat lahir" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tanggalLahir"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal Lahir</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="jenisKelamin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Jenis Kelamin</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                <SelectItem value="Perempuan">Perempuan</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="provinsi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provinsi</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih provinsi" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {provinsiData.map((provinsi) => (
                    <SelectItem key={provinsi} value={provinsi}>
                      {provinsi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="kabupaten"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kabupaten/Kota</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kabupaten/kota" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {kabupatenData.map((kabupaten) => (
                    <SelectItem key={kabupaten} value={kabupaten}>
                      {kabupaten}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="kecamatan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kecamatan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kecamatan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {kecamatanData.map((kecamatan) => (
                    <SelectItem key={kecamatan} value={kecamatan}>
                      {kecamatan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="desa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desa/Kelurahan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih desa/kelurahan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {desaData.map((desa) => (
                    <SelectItem key={desa} value={desa}>
                      {desa}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
