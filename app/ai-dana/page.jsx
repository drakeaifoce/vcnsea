"use client";

import { useCallback, useEffect, useState } from "react";
import { Textfield } from "../../components/Textfield";

export default function AiDana({ params }) {
  const [data, setData] = useState();
  console.log(params);

  // const fetchQuestion = useCallback(async (req) => {
  //   const res = await fetch("/api/ai-dana", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       prompt: req,
  //     }),
  //   });
  //   const body = await res.json();
  //   setData(body);
  // }, []);

  // useEffect(() => {
  //   fetchQuestion(
  //     "Generate 5 question for Junior Frontend Developer position, which can be asked on the interview. Return the response as a JSON objects array with a shape of number:questionNumber and question:questionItSelf",
  //   );
  // }, [fetchQuestion]);

  return (
    <div>
      {data &&
        data.map((question) => {
          return (
            <div key={question.number}>
              <p>{question.number + ". " + question.question}</p>
              <Textfield
                name={question.number}
                placeholder="Enter your answer here"
              />
              <Textfield
                name={toString(question.number)}
                placeholder="Enter your answer here"
              />
            </div>
          );
        })}
    </div>
  );
}
