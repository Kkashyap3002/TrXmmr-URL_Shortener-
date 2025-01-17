import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }

  return data;
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete("*").eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to delete URLs");
  }

  return data;
}

export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  const short_url = Math.random().toString(36).substring(2, 6);

  const fileName = `qr-${short_url}.png`;

  const fileOptions = {
    contentType: "image/png",
    cacheControl: "3600",
  };

  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode, fileOptions);

  if (storageError) throw new Error(storageError.message);

  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;
  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        original_url: longUrl,
        short_url,
        custom_url: customUrl || null,
        user_id,
        title,
        qr,
      },
    ])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Try new custom input, old one already there");
  }

  return data;
}
