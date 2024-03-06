import { useEffect, useState } from "react";

const HomePage = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState();
  const [term, setTerm] = useState("jakarta");
  const [data, setData] = useState([]);
  const payTimes = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  useEffect(() => {
    fetch(`https://api.aladhan.com/v1/timingsByAddress?address=${term}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          setData(res);
        }
        if (res.code === 400) {
          setError(res.data);
          setTimeout(() => {
            setError(null);
          }, 1000);
        }
      })
      .catch((error) => {
        // Handle the error here
        console.log(error);
        // Optionally, you can set some default data or handle the error in some other way
      });
  }, [term]);

  return (
    <div>
      <div className="text-white flex flex-col mt-5 mx-8 sm:mt-8 sm:mx-20 ">
        <div className="flex justify-between">
          <div className="text-lg">
            <p>{data.data && data.data.date.gregorian.weekday.en}</p>
            <p>{data.data && data.data.date.readable}</p>
          </div>
          <div className="text-lg">
            <p>{term && term}</p>
          </div>
        </div>
        <form
          action=""
          className="mx-auto mt-20  "
          onSubmit={(e) => {
            e.preventDefault();
            setTerm(input);
            setInput("");
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search Prayer Time By City"
            className="text-black py-2 px-4 sm:w-[20rem] rounded-2xl"
          />
          {error && <p className="text-red-500 pl-2 mt-2 absolute">{error}</p>}
        </form>

        <ul className="mx-auto mt-20 backdrop-blur-sm bg-white/30 w-60 sm:w-72 py-4 px-3 flex flex-col gap-y-2 rounded-xl ">
          {data.data &&
            payTimes.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex justify-between text-white text-lg bg-slate-900 font-semibold border-b-2 p-2 border-slate-900 "
                >
                  <div>{item}</div>
                  <div>{data.data && data.data.timings[item]}</div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
