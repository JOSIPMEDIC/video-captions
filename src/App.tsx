/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import CaptionList from "./components/CaptionList";
import { clips } from "./lib/variables";
import CaptionMenu from "./components/CaptionMenu";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [captionStyle, setCaptionStyle] = useState({
    color: "",
    size: "",
  });

  const [activeClip, setActiveClip] = useState(0);

  const [currentCue, setCurrentCue] = useState<TextTrackCue | undefined>();
  const [cueList, setCueList] = useState<
    TextTrackCueList | null | undefined | undefined[]
  >([]);

  const cueListArray = Array.from(cueList ?? []);

  const click = (cue: TextTrackCue) => {
    if (videoRef.current) {
      setCurrentCue(cue);
      videoRef.current.currentTime = cue.startTime + 0.1; // 0.1 second offset not to catch previous cue
    }
  };

  const isActiveListItem = (item: TextTrackCue) => {
    if (videoRef.current) {
      return (
        item.startTime === currentCue?.startTime &&
        currentCue?.endTime <= item.endTime
      );
    }
  };

  useEffect(() => {
    videoRef.current?.style.setProperty("--color-track", captionStyle.color);
    videoRef.current?.style.setProperty("--font-size-track", captionStyle.size);
  }, [captionStyle]);

  return (
    <div className="w-screen h-screen flex flex-row bg-foreground px-4">
      <div className="w-2/3 h-full flex justify-center flex-col p-4 gap-5">
        <video
          key={clips[activeClip].video}
          controls
          ref={videoRef}
          onLoadedData={() =>
            setCueList(videoRef.current?.textTracks?.[0].cues)
          }
          onTimeUpdate={() => {
            setCurrentCue(videoRef.current?.textTracks?.[0].activeCues?.[0]);
          }}
        >
          <source src={clips[activeClip].video} type="video/mp4" />
          <track
            default
            src={clips[activeClip].sub}
            kind="subtitles"
            label="English"
          />
        </video>
        <CaptionMenu
          setActiveClip={setActiveClip}
          captionStyle={captionStyle}
          setCaptionStyle={setCaptionStyle}
        />
      </div>
      <div className="max-w-1/3 h-full py-20 flex flex-col justify-center">
        <h1 className="p-4 text-2xl font-bold bg-background rounded-t-md ">
          Transcript
        </h1>
        <CaptionList
          currentCue={currentCue}
          cueListArray={cueListArray}
          click={click}
          isActiveListItem={isActiveListItem}
        />
      </div>
    </div>
  );
}

export default App;
