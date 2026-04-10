import { writeFile, mkdir } from "fs/promises";
import path from "path";

/**
 * Saves a file in local and store file path url into mongodb
 * Switch the logic to move to Cloudinary/S3 Later.
 */
export async function saveFile(
  file: File | null,
  folder: string = "enrollments",
): Promise<string | null> {
  if (!file || !(file instanceof File)) return null;

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the storage path
    const uploadDir = path.join(process.cwd(), "public", folder);
    const fileName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
    const filePath = path.join(uploadDir, fileName);

    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    // Write file to local disk
    await writeFile(filePath, buffer);

    // Return the URL path used to access the file from the browser
    return `/${folder}/${fileName}`;
  } catch (error) {
    console.error("Error saving file:", error);
    return null;
  }
}
