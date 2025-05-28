import nextConnect from "next-connect";
import multer, { FileFilterCallback } from "multer";
import FormData from "form-data";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 30 * 1024 * 1024 }, // 30 مگابایت
  fileFilter: (
    req: ExtendedRequest,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    // اگر خواستی می‌تونی اینجا فرمت‌ها رو چک کنی، الان همه فرمت‌ها قبول میشن
    cb(null, true);
  },
});

const apiRoute = nextConnect({
  onError(error: any, req: any, res: any) {
    res.status(501).json({ error: `Error: ${error.message}` });
  },
  onNoMatch(req: any, res: any) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(
  upload.fields([
    { name: "birth_certificate_first_page", maxCount: 1 },
    { name: "birth_certificate_second_page", maxCount: 1 },
    { name: "national_card_front", maxCount: 1 },
    { name: "national_card_back", maxCount: 1 },
    { name: "job_certificate", maxCount: 1 },
    { name: "credit_score", maxCount: 1 },
  ])
);

apiRoute.post(async (req, res) => {
  const files = req.files;
  if (!files) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const formData = new FormData();

  Object.entries(files).forEach(([key, fileArray]) => {
    fileArray.forEach((file) => {
      formData.append(key, file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
    });
  });

  try {
    const backendRes = await fetch("https://your-backend-url/upload", {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    if (!backendRes.ok) {
      const errorText = await backendRes.text();
      return res
        .status(backendRes.status)
        .json({ error: `Backend upload failed: ${errorText}` });
    }

    const result = await backendRes.json();
    res.status(200).json({ message: "Files forwarded to backend", result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Unknown error" });
  }
});

export const config = {
  api: {
    bodyParser: false, // multer خودش مدیریت می‌کنه
  },
};

export default apiRoute;
