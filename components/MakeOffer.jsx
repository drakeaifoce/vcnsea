"use client";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "./primitives/Button";

export const MakeOffer = ({ studentId }) => {
  const { data: session } = useSession();

  const createOffer = async () => {
    const res = await fetch(`/api/offer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyWorkerId: session.user.id,
        studentId,
        status: "Pending",
      }),
    });
    toast.success("Successfully make an offer");
    return res;
  };

  if (session && session.user) {
    if (session.user.Role === "COMPANY_WORKER") {
      return (
        <>
          <Toaster />
          <Button
            variant="secondary"
            onClick={() => {
              createOffer();
            }}
          >
            Make offer
          </Button>
        </>
      );
    }
    return <></>;
  }
  return <></>;
};
