"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, ImageIcon, Crop, RefreshCw } from "lucide-react"
import ReactCrop, { type Crop as CropType } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"

interface UploadFotoFormProps {
  form: UseFormReturn<any>
}

export function UploadFotoForm({ form }: UploadFotoFormProps) {
  const [src, setSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<CropType>({
    unit: "%",
    width: 75,
    height: 100,
    x: 12.5,
    y: 0,
    aspect: 3 / 4,
  })
  const [completedCrop, setCompletedCrop] = useState<CropType | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [isCropping, setIsCropping] = useState(false)

  const imgRef = useRef<HTMLImageElement | null>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      // Check file size (510 KB = 510 * 1024 bytes)
      if (file.size > 510 * 1024) {
        alert("Ukuran foto tidak boleh melebihi 510 KB")
        e.target.value = ""
        return
      }

      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setSrc(reader.result as string)
        setIsCropping(true)
        setCroppedImage(null)
      })
      reader.readAsDataURL(file)
    }
  }

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    imgRef.current = img

    // Set initial crop to center of image with 3:4 aspect ratio
    const width = img.width * 0.75
    const height = width * (4 / 3)
    const x = (img.width - width) / 2
    const y = (img.height - height) / 2

    setCrop({
      unit: "px",
      width,
      height,
      x,
      y,
      aspect: 3 / 4,
    })

    return false // Return false to prevent setting crop state again
  }, [])

  const generateCrop = useCallback(() => {
    if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
      const image = imgRef.current
      const canvas = previewCanvasRef.current
      const crop = completedCrop

      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        return
      }

      const pixelRatio = window.devicePixelRatio || 1

      // Gunakan ukuran asli untuk kualitas terbaik
      canvas.width = crop.width * scaleX
      canvas.height = crop.height * scaleY

      // Atur kualitas rendering
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY,
      )

      // Gunakan kualitas kompresi maksimal (1.0)
      const base64Image = canvas.toDataURL("image/jpeg", 1.0)

      // Check if the base64 string is too large (approximately 510 KB)
      if (base64Image.length > 700000) {
        // Jika terlalu besar, gunakan kompresi yang lebih rendah
        const compressedImage = canvas.toDataURL("image/jpeg", 0.8)
        setCroppedImage(compressedImage)
        form.setValue("foto", compressedImage)
      } else {
        setCroppedImage(base64Image)
        form.setValue("foto", base64Image)
      }

      setIsCropping(false)
    }
  }, [completedCrop, form])

  const resetCrop = () => {
    setSrc(null)
    setCroppedImage(null)
    setIsCropping(false)
    form.setValue("foto", null)
  }

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="foto"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Foto Santri (Ukuran 3x4)</FormLabel>
            <FormControl>
              <div className="space-y-4">
                {!src && !croppedImage && (
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-500 mb-4">
                      Upload foto dengan ukuran 3x4 dengan latar belakang berwarna
                    </p>
                    <Button type="button" onClick={() => document.getElementById("foto-upload")?.click()}>
                      <Upload className="mr-2 h-4 w-4" /> Pilih Foto
                    </Button>
                    <input id="foto-upload" type="file" accept="image/*" className="hidden" onChange={onSelectFile} />
                  </div>
                )}

                {isCropping && src && (
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <p className="text-sm text-gray-500 mb-2">Sesuaikan area foto dengan rasio 3:4</p>
                      <p className="text-sm text-gray-500 mb-4">
                        <strong>Panduan posisi wajah:</strong> Pastikan wajah berada di tengah frame dan menempati
                        sekitar 70-80% dari tinggi foto. Mata sebaiknya berada pada 1/3 bagian atas foto.
                      </p>
                      <div className="max-w-md mx-auto relative">
                        <ReactCrop
                          crop={crop}
                          onChange={(c) => setCrop(c)}
                          onComplete={(c) => setCompletedCrop(c)}
                          aspect={3 / 4}
                          className="max-h-[400px] mx-auto"
                        >
                          <img
                            ref={imgRef}
                            alt="Crop me"
                            src={src || "/placeholder.svg"}
                            onLoad={(e) => onImageLoad(e.currentTarget)}
                            className="max-h-[400px] mx-auto"
                          />
                        </ReactCrop>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={resetCrop}>
                        Batal
                      </Button>
                      <Button type="button" onClick={generateCrop}>
                        <Crop className="mr-2 h-4 w-4" /> Potong Foto
                      </Button>
                    </div>
                    <canvas ref={previewCanvasRef} className="hidden" />
                  </div>
                )}

                {croppedImage && !isCropping && (
                  <div className="space-y-4">
                    <Card className="p-4 flex flex-col items-center">
                      <p className="text-sm font-medium mb-2">Hasil Foto 3x4</p>
                      <div className="border rounded overflow-hidden" style={{ width: "3in", height: "4in" }}>
                        <img
                          src={croppedImage || "/placeholder.svg"}
                          alt="Cropped"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Card>
                    <div className="flex justify-end">
                      <Button type="button" variant="outline" onClick={resetCrop}>
                        <RefreshCw className="mr-2 h-4 w-4" /> Ganti Foto
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </div>
  )
}
