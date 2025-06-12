"use client";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import blankDocumentImage from "@/../public/images/documents/blank-image.png";

import { LuCloudUpload } from "react-icons/lu";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import SubmitBtn from "@/components/SubmitBtn";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { red } from "@mui/material/colors";

import api from "@/lib/axios";
import { toast } from "sonner";

import VisuallyHiddenInput from "@/components/VisuallyHiddenInput";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import GradeScoreDialog from "@/app/dashboard/components/GradeScoreDialog";
import { FaFilePdf } from "react-icons/fa6";

const twoMB = 2 * 1024 * 1024;

const schema = z.object({
  residence: z
    .any()
    .refine(
      (fileList) =>
        fileList?.file instanceof FileList && fileList.file.length > 0,
      {
        message: "لطفا مدارک سکونتی خود را بارگزاری کنید.",
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
  job_certificate: z
    .any()
    .refine(
      (fileList) =>
        fileList?.file instanceof FileList && fileList.file.length > 0,
      {
        message: "مدرک شغلی خود را بارگزاری کنید.",
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
  check: z
    .any()
    .refine(
      (fileList) =>
        fileList?.file instanceof FileList && fileList.file.length > 0,
      {
        message: "چک صیادی خود را بارگزاری کنید.",
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
  grade_score_pdf: z
    .any()
    .refine(
      (fileList) =>
        fileList?.file instanceof FileList && fileList.file.length > 0,
      {
        message: "فایل اعتبارسنحی دریافتی خود را بارگزاری کنید.",
      }
    )
    .refine(
      (fileList) => ["application/pdf"].includes(fileList?.file?.[0]?.type),
      {
        message: "فرمت فایل معتبر نمی باشد.",
      }
    )
    .refine((fileList) => !(fileList?.file?.[0]?.size > twoMB), {
      message: "حجم فایل از حد مجاز بیشتر است.",
    }),

  grade_score: z.string().min(1, "رتبه اعتباری خود را انتخاب کنید."),
});

export default function LoanDocumentUpload({ req_id }: { req_id: string }) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { grade_score: "" },
  });

  const router = useRouter();

  const submitHandler = async (data: any) => {
    const formData = new FormData();

    for (let i in data) {
      console.log(typeof data[i]);

      if (typeof data[i] === "object") {
        formData.append(i, data[i].file[0]);
        formData.append(
          `${i}_data`,
          JSON.stringify({
            fieldname: data[i].fieldname,
            order: data[i].order,
            label: data[i].label,
          })
        );
      } else {
        formData.append(i, data[i]);
      }
    }

    formData.append("req_id", req_id);

    try {
      const res = await api.post("/api/loan/documents", formData);
      console.log("submitted", res);

      toast.success(res.data);

      router.replace("/dashboard/loan/request");
    } catch (error: any) {
      if (error.status === 401) {
        toast.error(error.response.data);
      }

      if (error) {
        console.log(error);
        toast.error(error.response.data);
      }
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  //job certificate
  const [jcUrl, setJcUrl] = useState<string | null>(null);

  const [residenceUrl, setResidenceUrl] = useState<string | null>(null);

  const [checkUrl, setCheckUrl] = useState<string | null>(null);

  //grade score
  const [gsUrl, setGsUrl] = useState<string | null>(null);

  return (
    <Box component={"form"} onSubmit={handleSubmit(submitHandler)}>
      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography component={"h2"} sx={{ fontSize: 23 }}>
              گواهی شغلی
            </Typography>

            <Box sx={{ height: "100%" }}>
              <Card
                variant="outlined"
                sx={{
                  padding: 1.2,
                  height: "100%",
                  borderColor: errors.job_certificate && red[500],
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 2,
                    height: "100%",
                  }}
                >
                  <div className="bg-slate-300 flex justify-center rounded-md mb-3 h-[250px]">
                    <Image
                      src={jcUrl || blankDocumentImage.src}
                      alt="گواهی شغلی"
                      width={250}
                      height={250}
                    />
                  </div>
                  <Typography
                    component={"h3"}
                    sx={{ fontSize: 18, textAlign: "center" }}
                  >
                    یکی از موارد زیر را بارگزاری کنید.
                  </Typography>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontSize: 14 }}>فیش حقوقی</Typography>
                    <Typography sx={{ fontSize: 14 }}>سوابق بیمه</Typography>
                    <Typography sx={{ fontSize: 14 }}>معدل سه ماهه</Typography>
                    <Typography sx={{ fontSize: 14 }}>مستمری بگیری</Typography>
                  </Box>

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
                              const file = e.target.files?.[0];

                              const wrappedFile = {
                                file: e.target.files,
                                label: "گواهی شغلی",
                                order: 1,
                                fieldname: "job_certificate",
                              };

                              field.onChange(wrappedFile);

                              if (jcUrl) {
                                URL.revokeObjectURL(jcUrl);
                              }

                              if (file) {
                                const objectUrl = URL.createObjectURL(file);
                                setJcUrl(objectUrl);
                              } else {
                                setJcUrl(null);
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
          </Box>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography component={"h2"} sx={{ fontSize: 23 }}>
              مدارک سکونتی
            </Typography>

            <Box sx={{ height: "100%" }}>
              <Card
                variant="outlined"
                sx={{
                  padding: 1.2,
                  height: "100%",
                  borderColor: errors.residence && red[500],
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 2,
                    height: "100%",
                  }}
                >
                  <div className="bg-slate-300 flex justify-center rounded-md mb-3 h-[250px]">
                    <Image
                      src={residenceUrl || blankDocumentImage.src}
                      alt="مدارک سکونتی"
                      width={250}
                      height={250}
                    />
                  </div>
                  <Typography
                    component={"h3"}
                    sx={{ fontSize: 18, textAlign: "center" }}
                  >
                    اجاره نامه یا سند مسکونی
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

                  <Controller
                    name="residence"
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
                                label: "تصویر مدارک سکونتی",
                                order: 2,
                                fieldname: "residence",
                              };

                              field.onChange(wrappedFile);

                              if (residenceUrl) {
                                URL.revokeObjectURL(residenceUrl);
                              }

                              if (file) {
                                const objectUrl = URL.createObjectURL(file);
                                setResidenceUrl(objectUrl);
                              } else {
                                setResidenceUrl(null);
                              }
                            }}
                          />
                        </Button>
                      </>
                    )}
                  />
                </Box>
              </Card>
              {typeof errors.residence?.message === "string" && (
                <Typography color="error" variant="caption">
                  {errors.residence.message}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography component={"h2"} sx={{ fontSize: 23 }}>
              چک صیاد بنفش
            </Typography>

            <Box sx={{ height: "100%" }}>
              <Card
                variant="outlined"
                sx={{
                  padding: 1.2,
                  height: "100%",
                  borderColor: errors.check && red[500],
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 2,
                    height: "100%",
                  }}
                >
                  <div className="bg-slate-300 flex justify-center rounded-md mb-3 h-[250px]">
                    <Image
                      src={checkUrl || blankDocumentImage.src}
                      alt="تصویر چک صیادی بنفش"
                      width={250}
                      height={250}
                    />
                  </div>
                  <Typography
                    component={"h3"}
                    sx={{ fontSize: 18, textAlign: "center" }}
                  >
                    چک صیادی بنفش
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

                  <Controller
                    name="check"
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
                                label: "چک صیادی بنفش",
                                order: 3,
                                fieldname: "check",
                              };

                              field.onChange(wrappedFile);

                              if (checkUrl) {
                                URL.revokeObjectURL(checkUrl);
                              }

                              if (file) {
                                const objectUrl = URL.createObjectURL(file);
                                setCheckUrl(objectUrl);
                              } else {
                                setCheckUrl(null);
                              }
                            }}
                          />
                        </Button>
                      </>
                    )}
                  />
                </Box>
              </Card>
              {typeof errors.check?.message === "string" && (
                <Typography color="error" variant="caption">
                  {errors.check.message}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography component={"h2"} sx={{ fontSize: 23 }}>
              اعتبار سنجی
            </Typography>

            <Box sx={{ height: "100%" }}>
              <Card
                variant="outlined"
                sx={{
                  padding: 1.2,
                  height: "100%",
                  borderColor: errors.grade_score_pdf && red[500],
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 2,
                    height: "100%",
                  }}
                >
                  <div className="bg-slate-300 flex justify-center rounded-md mb-3 h-[250px]">
                    {!gsUrl && (
                      <div className="flex items-center justify-center h-full">
                        <FaFilePdf className="text-gray-200 text-8xl" />
                      </div>
                    )}
                    {gsUrl && (
                      <iframe
                        src={gsUrl}
                        width="100%"
                        height={"100%"}
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
                    sx={{ fontSize: 18, textAlign: "center" }}
                  >
                    فایلی که از{" "}
                    <Button>
                      <Link
                        href={"https://etebarito.nics24.ir/login"}
                        target="_blank"
                      >
                        سامانه اعتبار سنجی
                      </Link>
                    </Button>
                    دریافت کرده اید.
                  </Typography>

                  <Controller
                    name="grade_score"
                    control={control}
                    render={({ field }) => (
                      <FormControl sx={{ mb: 2 }} fullWidth>
                        <InputLabel id="gradeScore-select-form">
                          رتبه اعتباری
                        </InputLabel>
                        <Select
                          labelId="gradeScore-select-form"
                          id="gradeScore-select"
                          label="رتبه اعتباری"
                          {...field}
                          error={!!errors.grade_score}
                        >
                          <MenuItem dir="rtl" value={"A"}>
                            A
                          </MenuItem>
                          <MenuItem dir="rtl" value={"B"}>
                            B
                          </MenuItem>
                          <MenuItem dir="rtl" value={"C"}>
                            C
                          </MenuItem>
                          <MenuItem dir="rtl" value={"D"}>
                            D
                          </MenuItem>
                          <MenuItem dir="rtl" value={"E"}>
                            E
                          </MenuItem>
                        </Select>

                        <FormHelperText error={!!errors.grade_score}>
                          <span>{errors.grade_score?.message}</span>
                        </FormHelperText>
                        <FormHelperText>
                          <span
                            className="cursor-pointer"
                            onClick={() => setDialogOpen(true)}
                          >
                            رتبه اعتباری چیست؟
                          </span>
                          <GradeScoreDialog
                            open={dialogOpen}
                            onClose={() => setDialogOpen(false)}
                          />
                        </FormHelperText>
                      </FormControl>
                    )}
                  />

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

                  <Controller
                    name="grade_score_pdf"
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
                                label: "چک صیادی بنفش",
                                order: 4,
                                fieldname: "grade_score_pdf",
                              };

                              field.onChange(wrappedFile);

                              if (gsUrl) {
                                URL.revokeObjectURL(gsUrl);
                              }

                              if (file) {
                                const objectUrl = URL.createObjectURL(file);
                                setGsUrl(objectUrl);
                              } else {
                                setGsUrl(null);
                              }
                            }}
                          />
                        </Button>
                      </>
                    )}
                  />
                </Box>
              </Card>
              {typeof errors.grade_score_pdf?.message === "string" && (
                <Typography color="error" variant="caption">
                  {errors.grade_score_pdf.message}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </div>

      <SubmitBtn isSubmitting={isSubmitting}>ارسال مدارک</SubmitBtn>
    </Box>
  );
}
