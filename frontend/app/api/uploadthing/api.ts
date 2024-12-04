import { generateReactHelpers } from "@uploadthing/react";
import { OurFileRouter } from './core'

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
