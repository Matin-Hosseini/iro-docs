"use client";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Image from "next/image";
import Box from "@mui/material/Box";

import blankDocumentImage from "@/../public/images/documents/blank-image.png";
import { Typography } from "@mui/material";

import { LuCloudUpload } from "react-icons/lu";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import SubmitBtn from "@/components/SubmitBtn";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { red } from "@mui/material/colors";

import { FaFilePdf } from "react-icons/fa6";
import api from "@/lib/axios";
import { toast } from "sonner";

import VisuallyHiddenInput from "@/components/VisuallyHiddenInput";
import { redirect } from "next/navigation";

const threeMB = 1 * 1024 * 1024;

const schema = z.object({
  birth_certificate_first_page: z
    .any()
    .refine(
      (fileList) =>
        fileList?.file instanceof FileList && fileList.file.length > 0,
      {
        message: "صفحه اول شناسنامه را بارگزاری کنید.",
      }
    )
    .refine(
      (fileList) =>
        ["image/jpeg", "image/png", "image/webp"].includes(
          fileList?.file?.[0]?.type
        ),
      {
        message: "فرمت فایل معتبر نمی باشد.",
      }
    )
    .refine((fileList) => !(fileList?.file[0]?.size > threeMB), {
      message: "حجم فایل از حد مجاز بیشتر است.",
    }),
  birth_certificate_second_page: z
    .any()
    .refine(
      (fileList) =>
        fileList?.file instanceof FileList && fileList.file.length > 0,
      {
        message: "صفحه دوم شناسنامه را بارگزاری کنید.",
      }
    )
    .refine(
      (fileList) =>
        ["image/jpeg", "image/png", "image/webp"].includes(
          fileList?.file?.[0]?.type
        ),
      {
        message: "فرمت فایل معتبر نمی باشد.",
      }
    )
    .refine((fileList) => !(fileList?.file?.[0]?.size > threeMB), {
      message: "حجم فایل از حد مجاز بیشتر است.",
    }),
  national_card_front: z
    .any()
    .refine(
      (fileList) =>
        fileList?.file instanceof FileList && fileList.file.length > 0,
      {
        message: "تصویر جلوی کارت ملی را ارسال کنید.",
      }
    )
    .refine(
      (fileList) =>
        ["image/jpeg", "image/png", "image/webp"].includes(
          fileList?.file?.[0]?.type
        ),
      {
        message: "فرمت فایل معتبر نمی باشد.",
      }
    )
    .refine((fileList) => !(fileList?.file?.[0]?.size > threeMB), {
      message: "حجم فایل از حد مجاز بیشتر است.",
    }),
  national_card_back: z
    .any()
    .refine(
      (fileList) =>
        fileList?.file instanceof FileList && fileList.file.length > 0,
      {
        message: "تصویر پشت کارت ملی را بارگزاری کنید.",
      }
    )
    .refine(
      (fileList) =>
        ["image/jpeg", "image/png", "image/webp"].includes(
          fileList?.file?.[0]?.type
        ),
      {
        message: "فرمت فایل معتبر نمی باشد.",
      }
    )
    .refine((fileList) => !(fileList?.file?.[0]?.size > threeMB), {
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
      formData.append(i, data[i].file[0]);
      formData.append(
        `${i}_data`,
        JSON.stringify({
          fieldname: data[i].fieldname,
          order: data[i].order,
          label: data[i].label,
        })
      );
    }

    try {
      const res = await api.post("/api/user/identity-documents", formData);

      toast.success(res.data);
    } catch (error: any) {
      if (error.status === 401) {
        toast.error(error.response.data);
        redirect("/");
      }

      toast.error(error.response.data);
    }
  };

  //birth certificate first / second page
  const [bcfpUrl, setBcfpUrl] = useState<string | null>(null);
  const [bcspUrl, setBcspUrl] = useState<string | null>(null);

  //national card front/back
  const [ncfUrl, setNcfUrl] = useState<string | null>(null);
  const [ncbUrl, setNcbUrl] = useState<string | null>(null);

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
                    حداکثر حجم 3 مگابایت
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
                            const file = e.target.files?.[0];

                            const wrappedFile = {
                              file: e.target.files,
                              label: "تصویر صفحه اول شناسنامه",
                              order: 1,
                              fieldname: "birth_certificate_first_page",
                            };

                            field.onChange(wrappedFile);

                            if (bcfpUrl) {
                              URL.revokeObjectURL(bcfpUrl);
                            }

                            if (file) {
                              const objectUrl = URL.createObjectURL(file);
                              setBcfpUrl(objectUrl);
                            } else {
                              setBcfpUrl(null);
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
                    حداکثر حجم 3 مگابایت
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
                            const file = e.target.files?.[0];

                            const wrappedFile = {
                              file: e.target.files,
                              label: "تصویر صفحه دوم شناسنامه",
                              order: 2,
                              fieldname: "birth_certificate_second_page",
                            };

                            field.onChange(wrappedFile);

                            if (bcspUrl) {
                              URL.revokeObjectURL(bcspUrl);
                            }

                            if (file) {
                              const objectUrl = URL.createObjectURL(file);
                              setBcspUrl(objectUrl);
                            } else {
                              setBcspUrl(null);
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
                    حداکثر حجم 3 مگابایت
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
                            const file = e.target.files?.[0];

                            const wrappedFile = {
                              file: e.target.files,
                              label: "تصویر جلوی کارت ملی",
                              order: 3,
                              fieldname: "national_card_front",
                            };

                            field.onChange(wrappedFile);

                            if (ncfUrl) {
                              URL.revokeObjectURL(ncfUrl);
                            }

                            if (file) {
                              const objectUrl = URL.createObjectURL(file);
                              setNcfUrl(objectUrl);
                            } else {
                              setNcfUrl(null);
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
                    حداکثر حجم 3 مگابایت
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
                            const file = e.target.files?.[0];

                            const wrappedFile = {
                              file: e.target.files,
                              label: "تصویر پشت کارت ملی",
                              order: 4,
                              fieldname: "national_card_back",
                            };

                            field.onChange(wrappedFile);

                            if (ncbUrl) {
                              URL.revokeObjectURL(ncbUrl);
                            }

                            if (file) {
                              const objectUrl = URL.createObjectURL(file);
                              setNcbUrl(objectUrl);
                            } else {
                              setNcbUrl(null);
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

      <SubmitBtn isSubmitting={isSubmitting}>ارسال مدارک</SubmitBtn>
    </Box>
  );
}
