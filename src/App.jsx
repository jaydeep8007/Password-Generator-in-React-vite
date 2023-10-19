import { useState, useCallback, useEffect } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [charAllow, setCharAllow] = useState(false);
  const [numberAllow, setNumberAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";

    if (numberAllow) {
      str += "0123456789";
    }
    if (charAllow) {
      str += "!#$%^&*_+";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

      setPassword(pass);
    }
  }, [length, charAllow, numberAllow, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllow, numberAllow, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-slate-500 text-black rounded-lg  px-4 py-2 my-8  ">
        Password Generator
        <div className="flex  rounded-lg overflow-hidden mb-4 my-4">
          <input
            type="text"
            className="border-black text-black bg-white w-[400px] shadow-lg rounded-lg px-5 "
            value={password}
            placeholder="password"
            readOnly
          />
          <button className="bg-gray-700 mx-4 rounded-lg text-white px-2 py-2">
            copy
          </button>
        </div>
        <div className="flex space-x-2">
          <div className="flex">
            <input
              type="range"
              min={6}
              max={16}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className="cursor-pointer"
              defaultChecked={numberAllow}
              onChange={() => {
                setNumberAllow((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className="cursor-pointer"
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
