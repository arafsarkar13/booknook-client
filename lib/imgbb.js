// Uploads one image file to imgbb and returns the public image link
export async function uploadToImgbb(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    { method: "POST", body: formData },
  );
  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.success) {
    throw new Error("Image upload failed. Please try another image.");
  }
  return result.data.display_url;
}
