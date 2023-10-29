import http from ".";

export const UploadFileApi = async (file: File) => {
  try {
    const url: string = await http
      .get("/common/s3-upload-url?filename=" + file.name)
      .then((res) => res.data);
    await fetch(url, {
      headers: {
        "Content-Type": "",
      },
      method: "PUT",
      body: file,
    });
    return url.split("?")[0];
  } catch (error) {
    console.log("error:", error);
  }
};

export const loginApi = (body: any) => {
  return http.post("/auth/login", body).then((res) => res.data);
};
