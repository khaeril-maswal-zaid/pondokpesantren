import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface DataOrangTuaFormProps {
  form: UseFormReturn<any>
}

export function DataOrangTuaForm({ form }: DataOrangTuaFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="namaAyah"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Ayah</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama ayah" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="namaIbu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Ibu</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama ibu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="pekerjaanAyah"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pekerjaan Ayah</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan pekerjaan ayah" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pekerjaanIbu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pekerjaan Ibu</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan pekerjaan ibu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="kontakAyah"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Kontak Ayah</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nomor kontak ayah" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="kontakIbu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Kontak Ibu</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nomor kontak ibu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
