"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { Textfield } from "../../../../components/Textfield";

export default function EditUserAccount({ params }) {
  const router = useRouter();
  const [userAccountData, setUserAccountData] = useState();
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [quote, setQuote] = useState("");
  const [about, setAbout] = useState("");

  const getUserAccountData = useCallback(async () => {
    const res = await fetch(`/api/user/${params.id}/edit`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await res.json();
    setUserAccountData(body);
    setFirstName(body.firstName);
    setSecondName(body.secondName);
    setSpecialty(body.specialty);
    setCity(body.city);
    setWebsite(body.website);
    setQuote(body.quote);
    setAbout(body.about);
  }, []);

  const updateUserAccountData = async () => {
    const res = await fetch(`/api/user/${params.id}/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        secondName,
        specialty,
        city,
        website,
        quote,
        about,
      }),
    });
    router.push(`/user/${params.id}`);
  };

  useEffect(() => {
    getUserAccountData();
  }, [getUserAccountData]);

  return (
    <>
      {userAccountData && (
        <form className="flex w-full flex-col gap-6 px-4">
          <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
            Edit profile
          </h1>
          <div className="flex w-full flex-col gap-8 md:flex-row">
            <Input
              id="firstName"
              name="firstName"
              label="First name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="w-full"
              required
            />
            <Input
              id="firstName"
              label="Second name"
              name="firstName"
              placeholder="Enter your first name"
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
              type="text"
              className="w-full"
              required
            />
          </div>
          <div className="flex flex-col gap-8  md:flex-row">
            <Input
              id="specialty"
              name="specialty"
              label="Specialty"
              placeholder="Enter your specialty"
              value={specialty ? specialty : ""}
              onChange={(e) => setSpecialty(e.target.value)}
              type="text"
              className="w-full"
            />
            <Input
              id="city"
              label="City"
              name="city"
              placeholder="Enter your city"
              value={city ? city : ""}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-8  md:flex-row">
            <Input
              id="website"
              name="website"
              label="Website Link"
              placeholder="Enter your website link"
              value={website ? website : ""}
              onChange={(e) => setWebsite(e.target.value)}
              type="text"
              className="w-full"
            />
            <Input
              id="quote"
              label="Quote"
              name="quote"
              placeholder="Enter your quote"
              value={quote ? quote : ""}
              onChange={(e) => setQuote(e.target.value)}
              type="text"
              className="w-full"
            />
          </div>
          <Textfield
            id="about"
            label="About"
            name="about"
            placeholder="Enter information about you"
            value={about ? about : ""}
            onChange={(e) => setAbout(e.target.value)}
            type="text"
            className="w-full"
          />
          <Button
            variant="secondary"
            type="button"
            onClick={updateUserAccountData}
          >
            Save
          </Button>
        </form>
      )}
    </>
  );
}
