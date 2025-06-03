"use client";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Image from "next/image";
import Box from "@mui/material/Box";

import blankDocumentImage from "@/../public/images/documents/blank-image.png";
import { Typography } from "@mui/material";

import { LuCloudUpload } from "react-icons/lu";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import SubmitBtn from "@/components/SubmitBtn";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { red } from "@mui/material/colors";

import { FaFilePdf } from "react-icons/fa6";
import api from "@/lib/axios";
import { toast } from "sonner";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const fiveMB = 5 * 1024 * 1024;

const schema = z.object({
  birth_certificate_first_page: z
    .any()
    .refine((fileList) => fileList instanceof FileList && fileList.length > 0, {
      message: "صفحه اول شناسنامه را بارگزاری کنید.",
    })
    .refine(
      (fileList) =>
        ["image/jpeg", "image/png", "image/webp"].includes(fileList?.[0]?.type),
      {
        message: "فرمت فایل معتبر نمی باشد.",
      }
    )
    .refine((fileList) => !(fileList?.[0]?.size > fiveMB), {
      message: "حجم فایل از حد مجاز بیشتر است.",
    }),
  birth_certificate_second_page: z
    .any()
    .refine((fileList) => fileList instanceof FileList && fileList.length > 0, {
      message: "صفحه دوم شناسنامه را بارگزاری کنید.",
    })
    .refine(
      (fileList) =>
        ["image/jpeg", "image/png", "image/webp"].includes(fileList?.[0]?.type),
      {
        message: "فرمت فایل معتبر نمی باشد.",
      }
    )
    .refine((fileList) => !(fileList?.[0]?.size > fiveMB), {
      message: "حجم فایل از حد مجاز بیشتر است.",
    }),
  national_card_front: z
    .any()
    .refine((fileList) => fileList instanceof FileList && fileList.length > 0, {
      message: "تصویر جلوی کارت ملی را ارسال کنید.",
    })
    .refine(
      (fileList) =>
        ["image/jpeg", "image/png", "image/webp"].includes(fileList?.[0]?.type),
      {
        message: "فرمت فایل معتبر نمی باشد.",
      }
    )
    .refine((fileList) => !(fileList?.[0]?.size > fiveMB), {
      message: "حجم فایل از حد مجاز بیشتر است.",
    }),
  national_card_back: z
    .any()
    .refine((fileList) => fileList instanceof FileList && fileList.length > 0, {
      message: "تصویر پشت کارت ملی را بارگزاری کنید.",
    })
    .refine(
      (fileList) =>
        ["image/jpeg", "image/png", "image/webp"].includes(fileList?.[0]?.type),
      {
        message: "فرمت فایل معتبر نمی باشد.",
      }
    )
    .refine((fileList) => !(fileList?.[0]?.size > fiveMB), {
      message: "حجم فایل از حد مجاز بیشتر است.",
    }),
  job_certificate: z
    .any()
    .refine((fileList) => fileList instanceof FileList && fileList.length > 0, {
      message: "گواهی شغلی خود را بارگزاری کنید.",
    })
    .refine(
      (fileList) =>
        ["image/jpeg", "image/png", "image/webp"].includes(fileList?.[0]?.type),
      {
        message: "فرمت فایل معتبر نمی باشد.",
      }
    )
    .refine((fileList) => !(fileList?.[0]?.size > fiveMB), {
      message: "حجم فایل از حد مجاز بیشتر است.",
    }),
  credit_score: z
    .any()
    .refine((fileList) => fileList instanceof FileList && fileList.length > 0, {
      message: "فایل اعتبارسنجی خود را بارگزاری کنید.",
    })
    .refine((fileList) => ["application/pdf"].includes(fileList?.[0]?.type), {
      message: "فرمت فایل باید PDF باشد.",
    })
    .refine((fileList) => !(fileList?.[0]?.size > fiveMB), {
      message: "حجم فایل از حد مجاز بیشتر است.",
    }),
});

export default function DocumentUpload() {
  const {
    handleSubmit,

    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const submitHandler = async (data: any) => {
    const formData = new FormData();

    for (let i in data) {
      formData.append(i, data[i][0]);
    }

    try {
      const res = await api.post("/api/document-upload", formData);

      toast.success(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //birth certificate first / second page
  const [bcfpUrl, setBcfpUrl] = useState<string | null>(null);
  const [bcspUrl, setBcspUrl] = useState<string | null>(null);

  //national card front/back
  const [ncfUrl, setNcfUrl] = useState<string | null>(null);
  const [ncbUrl, setNcbUrl] = useState<string | null>(null);

  //job certificate
  const [jcUrl, setJcUrl] = useState<string | null>(null);

  //credit score
  const [csPDF, setCsPDF] = useState<string | null>(null);

  return (
    <Box component={"form"} onSubmit={handleSubmit(submitHandler)}>
      <Box sx={{ mb: 2 }}>
        <Typography component={"h2"} sx={{ fontSize: 23 }}>
          شناسنامه
        </Typography>

        <div className="grid sm:grid-cols-2 gap-3 ">
          <Box>
            <Card
              variant="outlined"
              sx={{
                padding: 1.2,
                borderColor: errors.birth_certificate_first_page && red[500],
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                }}
              >
                <div className="bg-slate-300 flex justify-center rounded-md mb-3 h-[250px]">
                  <Image
                    src={bcfpUrl || blankDocumentImage.src}
                    alt="تصویر صفحه اول شناسنامه"
                    width={250}
                    height={250}
                  />
                </div>
                <Typography
                  component={"h3"}
                  sx={{ fontSize: 18, textAlign: "center" }}
                >
                  تصویر صفحه اول شناسنامه
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    component={"h3"}
                    sx={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    فرمت قابل قبول: png, jpeg
                  </Typography>
                  <Typography
                    component={"h3"}
                    sx={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    حداکثر حجم 5 مگابایت
                  </Typography>
                </Box>

                <Controller
                  name="birth_certificate_first_page"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        fullWidth
                        startIcon={<LuCloudUpload />}
                      >
                        بارگزاری
                        <VisuallyHiddenInput
                          type="file"
                          multiple
                          onChange={(e) => {
                            console.log("uploading");
                            field.onChange(e.target.files);

                            const file = e.target.files?.[0];

                            if (file) {
                              const objectUrl = URL.createObjectURL(file);
                              setBcfpUrl(objectUrl);
                            }
                          }}
                        />
                      </Button>
                    </>
                  )}
                />
              </Box>
            </Card>
            {typeof errors.birth_certificate_first_page?.message ===
              "string" && (
              <Typography color="error" variant="caption">
                {errors.birth_certificate_first_page.message}
              </Typography>
            )}
          </Box>
          <Box>
            <Card
              variant="outlined"
              sx={{
                padding: 1.2,
                borderColor: errors.birth_certificate_second_page && red[500],
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                }}
              >
                <div className="bg-slate-300 flex justify-center rounded-md mb-3  h-[250px] max-h-[250px]">
                  <Image
                    src={bcspUrl || blankDocumentImage.src}
                    alt="تصویر صفحه دوم شناسنامه"
                    width={250}
                    height={250}
                  />
                </div>
                <Typography
                  component={"h3"}
                  sx={{ fontSize: 18, textAlign: "center" }}
                >
                  تصویر صفحه دوم شناسنامه
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    component={"h3"}
                    sx={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    فرمت قابل قبول: png, jpeg
                  </Typography>
                  <Typography
                    component={"h3"}
                    sx={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    حداکثر حجم 5 مگابایت
                  </Typography>
                </Box>

                <Controller
                  name="birth_certificate_second_page"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        fullWidth
                        startIcon={<LuCloudUpload />}
                      >
                        بارگزاری
                        <VisuallyHiddenInput
                          type="file"
                          multiple
                          onChange={(e) => {
                            console.log("uploading");
                            field.onChange(e.target.files);

                            const file = e.target.files?.[0];

                            if (file) {
                              const objectUrl = URL.createObjectURL(file);
                              setBcspUrl(objectUrl);
                            }
                          }}
                        />
                      </Button>
                    </>
                  )}
                />
              </Box>
            </Card>
            {typeof errors.birth_certificate_second_page?.message ===
              "string" && (
              <Typography color="error" variant="caption">
                {errors.birth_certificate_second_page.message}
              </Typography>
            )}
          </Box>
        </div>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component={"h2"} sx={{ fontSize: 23 }}>
          کارت ملی
        </Typography>

        <div className="grid sm:grid-cols-2 gap-3 ">
          <Box>
            <Card
              variant="outlined"
              sx={{
                padding: 1.2,
                borderColor: errors.national_card_front && red[500],
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                }}
              >
                <div className="bg-slate-300 flex justify-center rounded-md mb-3 h-[250px]">
                  <Image
                    src={ncfUrl || blankDocumentImage.src}
                    alt="تصویر جلوی کارت ملی"
                    width={250}
                    height={250}
                  />
                </div>
                <Typography
                  component={"h3"}
                  sx={{ fontSize: 18, textAlign: "center", mb: 2 }}
                >
                  تصویر جلوی کارت ملی
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    component={"h3"}
                    sx={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    فرمت قابل قبول: png, jpeg
                  </Typography>
                  <Typography
                    component={"h3"}
                    sx={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    حداکثر حجم 5 مگابایت
                  </Typography>
                </Box>

                <Controller
                  name="national_card_front"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        fullWidth
                        startIcon={<LuCloudUpload />}
                      >
                        بارگزاری
                        <VisuallyHiddenInput
                          type="file"
                          multiple
                          onChange={(e) => {
                            field.onChange(e.target.files);

                            const file = e.target.files?.[0];

                            if (file) {
                              const objectUrl = URL.createObjectURL(file);
                              setNcfUrl(objectUrl);
                            }
                          }}
                        />
                      </Button>
                    </>
                  )}
                />
              </Box>
            </Card>
            {typeof errors.national_card_front?.message === "string" && (
              <Typography color="error" variant="caption">
                {errors.national_card_front.message}
              </Typography>
            )}
          </Box>
          <Box>
            <Card
              variant="outlined"
              sx={{
                padding: 1.2,
                borderColor: errors.national_card_back && red[500],
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                }}
              >
                <div className="bg-slate-300 flex justify-center rounded-md mb-3  h-[250px] max-h-[250px]">
                  <Image
                    src={ncbUrl || blankDocumentImage.src}
                    alt="تصویر پشت کارت ملی"
                    width={250}
                    height={250}
                  />
                </div>
                <Typography
                  component={"h3"}
                  sx={{ fontSize: 18, textAlign: "center", mb: 2 }}
                >
                  تصویر پشت کارت ملی
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    component={"h3"}
                    sx={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    فرمت قابل قبول: png, jpeg
                  </Typography>
                  <Typography
                    component={"h3"}
                    sx={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    حداکثر حجم 5 مگابایت
                  </Typography>
                </Box>

                <Controller
                  name="national_card_back"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        fullWidth
                        startIcon={<LuCloudUpload />}
                      >
                        بارگزاری
                        <VisuallyHiddenInput
                          type="file"
                          multiple
                          onChange={(e) => {
                            field.onChange(e.target.files);

                            const file = e.target.files?.[0];

                            if (file) {
                              const objectUrl = URL.createObjectURL(file);
                              setNcbUrl(objectUrl);
                            }
                          }}
                        />
                      </Button>
                    </>
                  )}
                />
              </Box>
            </Card>
            {typeof errors.national_card_back?.message === "string" && (
              <Typography color="error" variant="caption">
                {errors.national_card_back.message}
              </Typography>
            )}
          </Box>
        </div>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component={"h2"} sx={{ fontSize: 23 }}>
          گواهی شغلی
        </Typography>

        <div className="grid sm:grid-cols-2 gap-3 ">
          <Box>
            <Card
              variant="outlined"
              sx={{
                padding: 1.2,
                borderColor: errors.job_certificate && red[500],
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                }}
              >
                <div className="bg-slate-300 flex justify-center rounded-md mb-3 h-[250px]">
                  <Image
                    src={jcUrl || blankDocumentImage.src}
                    alt="تصویر گواهی شغلی"
                    width={250}
                    height={250}
                  />
                </div>
                <Typography
                  component={"h3"}
                  sx={{ fontSize: 18, textAlign: "center", mb: 2 }}
                >
                  گواهی شغلی
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    component={"h3"}
                    sx={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    فرمت قابل قبول: png, jpeg
                  </Typography>
                  <Typography
                    component={"h3"}
                    sx={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    حداکثر حجم 5 مگابایت
                  </Typography>
                </Box>

                <Controller
                  name="job_certificate"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        fullWidth
                        startIcon={<LuCloudUpload />}
                      >
                        بارگزاری
                        <VisuallyHiddenInput
                          type="file"
                          multiple
                          onChange={(e) => {
                            field.onChange(e.target.files);

                            const file = e.target.files?.[0];

                            if (file) {
                              const objectUrl = URL.createObjectURL(file);
                              setJcUrl(objectUrl);
                            }
                          }}
                        />
                      </Button>
                    </>
                  )}
                />
              </Box>
            </Card>
            {typeof errors.job_certificate?.message === "string" && (
              <Typography color="error" variant="caption">
                {errors.job_certificate.message}
              </Typography>
            )}
          </Box>
        </div>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component={"h2"} sx={{ fontSize: 23 }}>
          رتبه اعتباری
        </Typography>

        <div className="grid sm:grid-cols-2 gap-3 ">
          <Box>
            <Card
              variant="outlined"
              sx={{
                padding: 1.2,
                borderColor: errors.credit_score && red[500],
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                }}
              >
                <div className="bg-slate-300 flex justify-center rounded-md mb-3 h-[250px]">
                  {!csPDF && (
                    <div className="flex items-center justify-center h-full">
                      <FaFilePdf className="text-gray-200 text-8xl" />
                    </div>
                  )}

                  {csPDF && (
                    <iframe
                      src={csPDF}
                      width="90%"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        marginTop: 10,
                      }}
                    />
                  )}
                </div>
                <Typography
                  component={"h3"}
                  sx={{ fontSize: 14, textAlign: "center", mb: 2 }}
                >
                  فایل پی دی افی که از سامانه اعتبارسنجی دریافت کرده اید.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    component={"h3"}
                    sx={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    فرمت قابل قبول: pdf
                  </Typography>
                  <Typography
                    component={"h3"}
                    sx={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    حداکثر حجم 5 مگابایت
                  </Typography>
                </Box>

                <Controller
                  name="credit_score"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        fullWidth
                        startIcon={<LuCloudUpload />}
                      >
                        بارگزاری
                        <VisuallyHiddenInput
                          type="file"
                          multiple
                          onChange={(e) => {
                            field.onChange(e.target.files);

                            const file = e.target.files?.[0];

                            if (file && file.type !== "application/pdf") {
                              setCsPDF(null);
                              return;
                            }

                            if (file) {
                              const objectUrl = URL.createObjectURL(file);
                              setCsPDF(objectUrl);
                            }
                          }}
                        />
                      </Button>
                    </>
                  )}
                />
              </Box>
            </Card>
            {typeof errors.credit_score?.message === "string" && (
              <Typography color="error" variant="caption">
                {errors.credit_score.message}
              </Typography>
            )}
          </Box>
        </div>
      </Box>

      <SubmitBtn isSubmitting={isSubmitting}>ارسال مدارک</SubmitBtn>
    </Box>
  );
}
