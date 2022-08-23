import { IndexOf, Range } from "advanced-types";
import { useEffect, useRef, useState } from "react";

const words = ["cpush", "move", "create", "config"] as const;

export const useTerminalHeader = () => {
  const [command, setCommand] = useState("");
  const isDeleting = useRef<{ status: boolean }>({ status: false });
  const status = useRef<{ word: number; char: number }>({
    word: 0,
    char: 0,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const { word: currentWord, char } = status.current;
      if (isDeleting.current.status) {
          setCommand((prev) =>  {
            if(prev.length) return prev.slice(0, -1)
            isDeleting.current.status = false;
            status.current = {
              word: Boolean(words[currentWord + 1]) ? currentWord + 1 : 0,
              char: 0,
            };
            return prev;
          });
      } else {
        setCommand((prev) => {
          if (words[currentWord][char]) {
            status.current = { word: currentWord, char: char + 1 };
            return `${prev}${words[currentWord][char]}`;
          } else {
            isDeleting.current.status = true;
            return prev;
          }
        });
      }
    }, 400);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return command;
};
