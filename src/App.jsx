import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

function App() {
  const [password, setPassword] = useState("");
  const [isNumeric, setIsNumeric] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);
  const [length, setLength] = useState(8);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let string = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if (isNumeric) {
      string += "1234567890";
    }
    if (isSpecial) {
      string += "~!@#$%^&*()_+={}|:?/><.,";
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * string.length);
      password += string[index];
    }

    return password;
  });

  useEffect(() => {
    const new_password = generatePassword();
    setPassword(new_password);
    setCopied(false);
  }, [isNumeric, isSpecial, length]);

  return (
    <div className={`w-full h-screen bg-[url('./assets/images/passwordgen_img2.jpeg')] bg-center flex justify-center`}>
      <div className="w-[50vw] h-[200px] bg-zinc-300 mt-10 rounded-[10px] flex flex-col justify-around p-[10px]">
        <h1 className="text-center text-2xl tracking-widest font-semibold">
          PASSWORD  GENERATOR
        </h1>
        <div className="flex items-center rounded-[10px] overflow-hidden h-[40px]">
          <input type="text" className="w-[90%] h-full p-3" value={password} />
          <button
            className={`flex justify-center items-center text-white text-sm w-[10%] h-full bg-${
              copied ? "green" : "blue"
            }-700`}
            onClick={() => {
              navigator.clipboard.writeText(password);
              setCopied(true);
            }}
          >
            {copied ? <FaCheck size="1.2rem" /> : "Copy"}
          </button>
        </div>
        <div className="flex justify-around">
          <div className="flex gap-[5px]">
            <input
              id="length"
              type="range"
              min={4}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length">Length({length})</label>
          </div>
          <div className="flex gap-[5px]">
            <input
              id="numeric"
              type="checkbox"
              checked={isNumeric}
              onChange={() => setIsNumeric((prev) => !prev)}
            />
            <label htmlFor="numeric">Numbers</label>
          </div>
          <div className="flex gap-[5px]">
            <input
              id="length"
              type="checkbox"
              checked={isSpecial}
              onChange={() => setIsSpecial((prev) => !prev)}
            />
            <label htmlFor="length">Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
