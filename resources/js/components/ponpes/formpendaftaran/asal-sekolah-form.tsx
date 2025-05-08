"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Generate tahun dari 2000 sampai 2025
const tahunOptions = Array.from({ length: 26 }, (_, i) => (2000 + i).toString())

interface AsalSekolahFormProps {
  form: UseFormReturn<any>
}

export function AsalSekolahForm({ form }: AsalSekolahFormProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="namaSekolah"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama Sekolah Dasar</FormLabel>
            <FormControl>
              <Input placeholder="Masukkan nama sekolah dasar" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nisn"
        render={({ field }) => (
          <FormItem>
            <FormLabel>NISN</FormLabel>
            <FormControl>
              <Input placeholder="Masukkan NISN 10 digit" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tahunTamat"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tahun Tamat SD</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tahun tamat" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {tahunOptions.map((tahun) => (
                  <SelectItem key={tahun} value={tahun}>
                    {tahun}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
