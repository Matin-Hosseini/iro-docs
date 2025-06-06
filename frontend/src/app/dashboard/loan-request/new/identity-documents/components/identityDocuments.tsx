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
import { green, grey, orange, red } from "@mui/material/colors";

import { FaFilePdf } from "react-icons/fa6";
import api from "@/lib/axios";
import { toast } from "sonner";

import VisuallyHiddenInput from "@/components/VisuallyHiddenInput";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

const twoMB = 2 * 1024 * 1024;

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
    .refine((fileList) => !(fileList?.file[0]?.size > twoMB), {
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
    .refine((fileList) => !(fileList?.file?.[0]?.size > twoMB), {
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
    .refine((fileList) => !(fileList?.file?.[0]?.size > twoMB), {
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
    .refine((fileList) => !(fileList?.file?.[0]?.size > twoMB), {
      message: "حجم فایل از حد مجاز بیشتر است.",
    }),
});

export default function IdentityDocumentsUpload({
  documents,
}: {
  documents: any;
}) {
  console.log(documents);

  const {
    handleSubmit,

    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const router = useRouter();

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
      console.log("submitted", res);

      toast.success(res.data);

      router.replace("/dashboard/loan-request/new/product-request");
    } catch (error: any) {
      if (error.status === 401) {
        toast.error(error.response.data);
      }

      if (error) {
        console.log(error);
        toast.error(error.response.data);
      }
      // revalidatePath("/dashboard/loan-request/new/identity-documents");
    }
  };

  //birth certificate first / second page
  const [bcfpUrl, setBcfpUrl] = useState<string | null>(null);
  const [bcspUrl, setBcspUrl] = useState<string | null>(null);

  //national card front/back
  const [ncfUrl, setNcfUrl] = useState<string | null>(null);
  const [ncbUrl, setNcbUrl] = useState<string | null>(null);

  const generateStatusColors = (status: string) => {
    switch (status) {
      case "pending":
        return orange[700];

      case "approved":
        return green[500];

      case "rejected":
        return red[500];

      default:
        return grey[500];
    }
  };

  const generateStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "در انتظار تایید";

      case "approved":
        return "تایید شده";

      case "rejected":
        return "رد شده";
    }
  };

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
                borderColor: documents.length
                  ? generateStatusColors(
                      documents.find(
                        (item: any) =>
                          item.type === "birth_certificate_first_page"
                      ).status
                    )
                  : errors.birth_certificate_first_page && red[500],
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
                    src={
                      bcfpUrl ||
                      (documents.length &&
                        documents.find(
                          (item: any) =>
                            item.type === "birth_certificate_first_page"
                        ).fileLink) ||
                      blankDocumentImage.src
                    }
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
                    فرمت قابل قبول: png, jpeg, webp
                  </Typography>
                  <Typography
                    component={"h3"}
                    sx={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    حداکثر حجم 2 مگابایت
                  </Typography>
                </Box>

                {!documents.length ? (
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
                ) : (
                  <Button
                    sx={{
                      background: generateStatusColors(
                        documents.find(
                          (item: any) =>
                            item.type === "birth_certificate_first_page"
                        ).status
                      ),
                      color: "white",
                    }}
                  >
                    {generateStatusText(
                      documents.find(
                        (item: any) =>
                          item.type === "birth_certificate_first_page"
                      ).status
                    )}
                  </Button>
                )}
              </Box>
            </Card>
            {typeof errors.birth_certificate_first_page?.message ===
              "string" && (
              <Typography color="error" variant="caption">
                {errors.birth_certificate_first_page.message}
              </Typography>
            )}

            {!!documents.length &&
              documents?.find(
                (item: any) => item.type === "birth_certificate_first_page"
              )?.status === "rejected" && (
                <Typography variant="caption" color="error">
                  {
                    documents?.find(
                      (item: any) =>
                        item.type === "birth_certificate_first_page"
                    )?.rejectionReason
                  }
                </Typography>
              )}
          </Box>
          <Box>
            <Card
              variant="outlined"
              sx={{
                padding: 1.2,
                borderColor: documents.length
                  ? generateStatusColors(
                      documents.find(
                        (item: any) =>
                          item.type === "birth_certificate_second_page"
                      ).status
                    )
                  : errors.birth_certificate_first_page && red[500],
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
                    src={
                      bcspUrl ||
                      (documents.length &&
                        documents.find(
                          (item: any) =>
                            item.type === "birth_certificate_second_page"
                        ).fileLink) ||
                      blankDocumentImage.src
                    }
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
                    فرمت قابل قبول: png, jpeg, webp
                  </Typography>
                  <Typography
                    component={"h3"}
                    sx={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    حداکثر حجم 2 مگابایت
                  </Typography>
                </Box>

                {!documents.length ? (
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
                ) : (
                  <Button
                    sx={{
                      background: generateStatusColors(
                        documents.find(
                          (item: any) =>
                            item.type === "birth_certificate_second_page"
                        ).status
                      ),
                      color: "white",
                    }}
                  >
                    {generateStatusText(
                      documents.find(
                        (item: any) =>
                          item.type === "birth_certificate_second_page"
                      ).status
                    )}
                  </Button>
                )}
              </Box>
            </Card>
            {typeof errors.birth_certificate_second_page?.message ===
              "string" && (
              <Typography color="error" variant="caption">
                {errors.birth_certificate_second_page.message}
              </Typography>
            )}
            {!!documents.length &&
              documents?.find(
                (item: any) => item.type === "birth_certificate_second_page"
              ).status === "rejected" && (
                <Typography variant="caption" color="error">
                  {
                    documents?.find(
                      (item: any) =>
                        item.type === "birth_certificate_second_page"
                    )?.rejectionReason
                  }
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
                borderColor: documents.length
                  ? generateStatusColors(
                      documents.find(
                        (item: any) => item.type === "national_card_front"
                      ).status
                    )
                  : errors.birth_certificate_first_page && red[500],
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
                    src={
                      ncfUrl ||
                      (documents.length &&
                        documents.find(
                          (item: any) => item.type === "national_card_front"
                        ).fileLink) ||
                      blankDocumentImage.src
                    }
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
                    فرمت قابل قبول: png, jpeg, webp
                  </Typography>
                  <Typography
                    component={"h3"}
                    sx={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    حداکثر حجم 2 مگابایت
                  </Typography>
                </Box>

                {!documents.length ? (
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
                ) : (
                  <Button
                    sx={{
                      background: generateStatusColors(
                        documents.find(
                          (item: any) => item.type === "national_card_front"
                        ).status
                      ),
                      color: "white",
                    }}
                  >
                    {generateStatusText(
                      documents.find(
                        (item: any) => item.type === "national_card_front"
                      ).status
                    )}
                  </Button>
                )}
              </Box>
            </Card>
            {typeof errors.national_card_front?.message === "string" && (
              <Typography color="error" variant="caption">
                {errors.national_card_front.message}
              </Typography>
            )}
            {!!documents.length &&
              documents?.find(
                (item: any) => item.type === "national_card_front"
              ).status === "rejected" && (
                <Typography variant="caption" color="error">
                  {
                    documents?.find(
                      (item: any) => item.type === "national_card_front"
                    )?.rejectionReason
                  }
                </Typography>
              )}
          </Box>
          <Box>
            <Card
              variant="outlined"
              sx={{
                padding: 1.2,
                borderColor: documents.length
                  ? generateStatusColors(
                      documents.find(
                        (item: any) => item.type === "national_card_back"
                      ).status
                    )
                  : errors.birth_certificate_first_page && red[500],
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
                    src={
                      ncbUrl ||
                      (documents.length &&
                        documents.find(
                          (item: any) => item.type === "national_card_back"
                        ).fileLink) ||
                      blankDocumentImage.src
                    }
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
                    فرمت قابل قبول: png, jpeg, webp
                  </Typography>
                  <Typography
                    component={"h3"}
                    sx={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    حداکثر حجم 2 مگابایت
                  </Typography>
                </Box>

                {!documents.length ? (
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
                ) : (
                  <Button
                    sx={{
                      background: generateStatusColors(
                        documents.find(
                          (item: any) => item.type === "national_card_back"
                        ).status
                      ),
                      color: "white",
                    }}
                  >
                    {generateStatusText(
                      documents.find(
                        (item: any) => item.type === "national_card_back"
                      ).status
                    )}
                  </Button>
                )}
              </Box>
            </Card>
            {typeof errors.national_card_back?.message === "string" && (
              <Typography color="error" variant="caption">
                {errors.national_card_back.message}
              </Typography>
            )}
            {!!documents.length &&
              documents?.find((item: any) => item.type === "national_card_back")
                .status === "rejected" && (
                <Typography variant="caption" color="error">
                  {
                    documents?.find(
                      (item: any) => item.type === "national_card_back"
                    )?.rejectionReason
                  }
                </Typography>
              )}
          </Box>
        </div>
      </Box>

      {documents.length ? (
        <Button variant="contained" fullWidth color="success">
          <Link
            className="block w-full h-full"
            href={"/dashboard/loan-request/new/product-request"}
          >
            تایید و ادامه
          </Link>
        </Button>
      ) : (
        <SubmitBtn isSubmitting={isSubmitting}>ارسال مدارک</SubmitBtn>
      )}
    </Box>
  );
}
