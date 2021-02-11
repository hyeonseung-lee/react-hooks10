import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const useDeviceOrientation = () => {
  const [state, setstate] = useState({
    a: null,
    b: null,
    c: null,
  });
  const handleChange = (event) => {
    setstate({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    });
  };
  useEffect(() => {
    window.addEventListener("deviceorientation", handleChange, true);
    return () => {
      window.removeEventListener("deviceorientation", handleChange, true);
    };
  });

  return { ...state };
};

const useFavicon = (favUrl) => {
  const [url, setUrl] = useState(favUrl);
  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']");
    link.href = url;
  }, [url]);

  return setUrl;
};

const useGeolocation = () => {
  const [pos, setPos] = useState({
    crd: null,
  });
  const [error, setError] = useState({
    error: null,
  });
  navigator.geolocation.getCurrentPosition(setPos, setError);

  return { pos, error };
};
const useKeyPress = (key) => {
  const [bool = false, setBool] = useState();

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      setBool(e.key === key);
    });
    return () => {
      document.removeEventListener(
        "keypress",
        (e) => {
          setBool(e.key === key);
        },
        setBool(false)
      );
    };
  }, [key]);

  return bool;
};
const useLocalStorage = (name = "JWT", initialValue = null) => {
  const [state, setState] = useState(initialValue);

  const setLS = (value) => {
    localStorage.setItem(name, value);
    setState(localStorage.getItem(name));
  };

  return [state, setLS];
};
const useMousePosition = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      setPosition({ x: e.screenX, y: e.screenY });
    });
    return () => {
      document.removeEventListener("mousemove", (e) => {
        setPosition({ x: e.screenX, y: e.screenY });
      });
    };
  }, []);

  return position;
};
const useOnline = () => {
  const [status, setStatus] = useState(navigator.onLine);
  const handleChange = () => {
    setStatus(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    return () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);

  return status;
};
const useLockScroll = () => {
  const [status, setStatus] = useState(false);
  const lockScroll = () => {
    document.body.style.overflow = "hidden";
    setStatus(true);
  };
  const unlockScroll = () => {
    document.body.style.overflow = "scroll";
    setStatus(false);
  };

  return [status, { lockScroll, unlockScroll }];
};
function App() {
  // useDeviceOrientation
  const { alpha, beta, gamma } = useDeviceOrientation();

  // useFavicon
  const link = document.querySelector("link[rel*='icon']");
  const newFaviconUrl =
    "https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico";
  const setFavicon = useFavicon(link.href);

  // useGeolocation
  const { pos, error } = useGeolocation();

  // useKeyPress
  const kPressed = useKeyPress("k");
  const iPressed = useKeyPress("i");
  const mPressed = useKeyPress("m");
  const cPressed = useKeyPress("c");
  const hPressed = useKeyPress("h");

  // useLocalStorage
  const [currentJS, setLS] = useLocalStorage();

  // useMousePosition
  const { x, y } = useMousePosition();

  // useOnline
  const isOnLine = useOnline();

  // useLockScroll
  const [isLocked, { lockScroll, unlockScroll }] = useLockScroll();

  return (
    <>
      <div className="App">
        <h1>Superhooks!</h1>
      </div>
      <div>
        <h2>useDeviceOrientation</h2>
        <ul>
          <li>alpha : {alpha}</li>
          <li>beta : {beta}</li>
          <li>gamma : {gamma}</li>
        </ul>
      </div>
      <div>
        <h2>useFavicon</h2>
        <button
          onClick={() => {
            setFavicon(newFaviconUrl);
          }}
        >
          Change Favicon
        </button>
      </div>
      <div>
        <h2>useGeolocation</h2>
        <ul>
          <li>latitude : {pos.coords ? pos.coords.latitude : null}</li>
          <li>longitude : {pos.coords ? pos.coords.longitude : null}</li>
          <li>error : {error.error ? error : "null"}</li>
        </ul>
      </div>
      <div>
        <h2>useKeyPress</h2>
        <ul>
          <li>Pressed 'k' : {kPressed && "K"}</li>
          <li>Pressed 'i' : {iPressed && "I"}</li>
          <li>Pressed 'm' : {mPressed && "M"}</li>
          <li>Pressed 'c' : {cPressed && "C"}</li>
          <li>Pressed 'h' : {hPressed && "H"}</li>
          <li>Pressed 'i' : {iPressed && "I"}</li>
        </ul>
      </div>
      <div>
        <h2>useLocalStorage</h2>
        <ul>
          <li>Current Value: {currentJS}</li>
          <button onClick={() => setLS("12345")}>Set value : 12345</button>
          <button onClick={() => setLS(null)}>Clear LS</button>
        </ul>
      </div>
      <div>
        <h2>useMousePosition</h2>
        <ul>
          <li>Mouse X : {x}</li>
          <li>Mouse Y : {y}</li>
        </ul>
      </div>
      <div>
        <h2>useOnline</h2>
        <h4>Are we online? {isOnLine ? "Yes" : "No"}</h4>
      </div>
      <div>
        <h2>useLockScroll</h2>
        <h4>Is locked? {isLocked ? "Yes" : "No"}</h4>
        <button
          onClick={() => {
            lockScroll();
          }}
        >
          LockScroll
        </button>
        <button
          onClick={() => {
            unlockScroll();
          }}
        >
          UnLockScroll
        </button>
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
