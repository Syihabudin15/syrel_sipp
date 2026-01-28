"use client";

import { EDapemStatus, ESubmissionStatus } from "@prisma/client";
import { Tag } from "antd";

export const GetStatusTag = (status: ESubmissionStatus | undefined | null) => {
  if (status) {
    return (
      <Tag
        color={
          status === "APPROVED"
            ? "green"
            : status === "PENDING"
              ? "orange"
              : "red"
        }
        variant="solid"
      >
        {status}
      </Tag>
    );
  }
  return <div></div>;
};
export const GetDroppingStatusTag = (
  status: EDapemStatus | undefined | null,
) => {
  if (status) {
    return (
      <Tag
        color={
          status === "APPROVED" || status === "PAID_OFF"
            ? "green"
            : status === "DRAFT"
              ? "orange"
              : status === "PROCCESS"
                ? "blue"
                : "red"
        }
        variant="solid"
      >
        {status}
      </Tag>
    );
  }
  return <div></div>;
};
