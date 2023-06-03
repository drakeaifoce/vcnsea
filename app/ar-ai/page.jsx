"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../components/primitives/Button";
import { Textfield } from "../../components/primitives/Textfield";

export default function AiDana({ searchParams }) {
  const [questions, setQuestions] = useState();
  const [response, setResponse] = useState();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [a3, setA3] = useState("");
  const [a4, setA4] = useState("");
  const [a5, setA5] = useState("");
  const fetchQuestion = useCallback(async (req) => {
    setIsLoading(true);
    const res = await fetch("/api/ar-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: req,
      }),
    });
    const body = await res.json();
    setQuestions(body);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchQuestion(
      `You are a technical recruiter in company and you conduct technical interview. Generate 5 technical interview questions focused on theory to a candidate applying to the ${searchParams.p} position. Return the response as a JSON objects array with a shape of {"n":"question number", "question":"question itself"} and nothing extra`,
    );
  }, [fetchQuestion, searchParams.p]);

  const onSubmitGetResponse = useCallback(async (req) => {
    setIsLoading(true);
    const res = await fetch("/api/ar-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: req,
      }),
    });
    const body = await res.json();
    setResponse(body);
    setShow(true);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div role="status" className="container mx-auto my-auto w-full">
        <svg
          aria-hidden="true"
          className="mx-auto h-8 w-8 animate-spin fill-blue-9 text-gray-primary dark:text-black"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (!isLoading) {
    return (
      <div className="container mx-auto flex w-full flex-col items-center gap-4">
        {questions !== undefined && questions !== null && (
          <div className="grid grid-rows-5 items-center gap-4 text-sm md:text-base lg:text-lg">
            <div className="grid w-full grid-cols-2 gap-4">
              <p>{questions[0].question}</p>
              <Textfield
                type="text"
                className="w-full"
                value={a1}
                onChange={(e) => {
                  setA1(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p>{questions[1].question}</p>
              <Textfield
                type="text"
                value={a2}
                className="w-full"
                onChange={(e) => {
                  setA2(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p>{questions[2].question}</p>
              <Textfield
                type="text"
                className="w-full"
                value={a3}
                onChange={(e) => {
                  setA3(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p>{questions[3].question}</p>
              <Textfield
                type="text"
                value={a4}
                className="w-full"
                onChange={(e) => {
                  setA4(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p>{questions[4].question}</p>
              <Textfield
                type="text"
                className="w-full"
                value={a5}
                onChange={(e) => {
                  setA5(e.target.value);
                }}
              />
            </div>
          </div>
        )}

        {response && show && (
          <div className="flex w-full flex-col gap-4 border bg-orange-primary p-4 text-sm md:text-base lg:text-lg">
            {response.map((point, i) => {
              return (
                <div
                  key={point.i}
                  className="flex flex-row items-start gap-1 text-left"
                >
                  <p className="font-semibold">{point.n + ". "}</p>
                  <p
                    className={`text-black ${
                      point.n === 6 ? "font-bold" : "font-normal"
                    }`}
                  >
                    {point.feedback}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-row items-center gap-4">
          <Button
            variant="primary"
            className={!show ? "block" : "hidden"}
            onClick={() => {
              const responseString =
                "1)" + a1 + " 2)" + a2 + " 3)" + a3 + " 4)" + a4 + " 5)" + a5;

              onSubmitGetResponse(
                `You are a technical recruiter in company and you conduct technical interview. Previously you asked this 5 questions ${JSON.stringify(
                  questions,
                )} to a candidate applying on ${
                  searchParams.p
                } position.Here is candidates' answers-${responseString} associated with question numbers. Return the fair feedback and correct answers in format of JSON objects array with a shape of {"n":"feedback number", "feedback":"feedback text"} (Provide sixth object in the same format, but the feedback will be the pass success rate in percents) and nothing extra.`,
              );
            }}
          >
            Get feedback
          </Button>
          <Link href="/" className={show ? "block" : "hidden"}>
            <Button variant="secondary">Finish</Button>
          </Link>
        </div>
      </div>
    );
  }
}
