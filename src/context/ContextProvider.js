import { createContext, useEffect, useState } from "react";

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

export const Context = createContext();

function ContextProvider({ children }) {
  const [mapProps, setMapProps] = useState({});
  const [memories, setMemories] = useState([]);
  const [carousel, setCarousel] = useState(images);

  useEffect(() => {
    console.log("useEffect ContextProvider -> events: ", memories);
  }, [memories]);

  return (
    <Context.Provider
      value={{
        mapProps,
        setMapProps,
        memories,
        setMemories,
        carousel,
        setCarousel,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
