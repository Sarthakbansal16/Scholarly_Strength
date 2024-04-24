import React, { useEffect, useState } from 'react';
import { getMotivationalQuotes } from './Motivation.api';

function MotivationalQuotes() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    async function fetchQuotes() {
      const quotes = await getMotivationalQuotes();
      setQuotes(quotes);
    }

    fetchQuotes();
  }, []);

//   return (
//     <div className="flex flex-col items-start space-y-4 p-4">
//       {quotes.map((quote, index) => (
//         <div key={index} className="text-lg">
//           {quote}
//         </div>
//       ))}
//     </div>
//   );

return(
    <div className="w-full h-full flex items-center justify-center ml-2.5 ">
    <div className="text-5xl font-cursive text-white">
      <q className="text-5xl font-bold"></q>
      <span>{quotes[0]}</span>
      <q className="text-5xl font-bold"></q>
    </div>
  </div>

);
}

export default MotivationalQuotes;