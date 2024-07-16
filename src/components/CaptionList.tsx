/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRef, useEffect, useRef } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

type Props = {
  cueListArray: (TextTrackCue | undefined)[];
  currentCue: TextTrackCue | undefined;
  click: (cue: TextTrackCue) => void;
  isActiveListItem: (cue: TextTrackCue) => boolean | undefined;
};

const CaptionList = ({
  cueListArray,
  currentCue,
  click,
  isActiveListItem,
}: Props) => {
  const listItemRefs = useRef([]);

  useEffect(() => {
    const activeIndex = cueListArray?.findIndex((cue) => cue === currentCue);

    //Scrolls list item to top of the list when currentCue changes
    (listItemRefs.current[activeIndex] as any)?.current.scrollIntoView({
      alignToTop: true,
      behavior: "smooth",
    });
  }, [currentCue]);

  listItemRefs.current = cueListArray?.map(
    (_, i) => listItemRefs.current[i] ?? createRef()
  );

  return (
    <ScrollArea className="h-full p-1 border-t bg-background rounded-b-md ">
      {cueListArray?.map((cue, index) => {
        return (
          <p
            ref={listItemRefs.current[index]}
            key={cue?.endTime}
            onClick={() => {
              click(cue as TextTrackCue);
              (listItemRefs.current[index] as any)?.current.scrollIntoView({
                alignToTop: true,
                behavior: "smooth",
              });
            }}
            className={cn(
              "p-2 border-b  border-accent cursor-pointer rounded-md hover:bg-primary/70 hover:text-primary-foreground transition-all hover:scale-[101%]",
              isActiveListItem(cue as TextTrackCue)
                ? "bg-primary text-primary-foreground"
                : ""
            )}
          >
            {(cue as TextTrackCue & { text: string })?.text}
          </p>
        );
      })}
    </ScrollArea>
  );
};

export default CaptionList;
