import React from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  setActiveClip: React.Dispatch<React.SetStateAction<number>>;
  captionStyle: {
    color: string;
    size: string;
  };
  setCaptionStyle: React.Dispatch<
    React.SetStateAction<{
      color: string;
      size: string;
    }>
  >;
};

const CaptionMenu = ({
  setActiveClip,
  captionStyle,
  setCaptionStyle,
}: Props) => {
  return (
    <div className="flex justify-between gap-4">
      <div className="flex gap-4">
        <Button className="w-min" onClick={() => setActiveClip(0)}>
          Clip 1
        </Button>
        <Button className="w-min" onClick={() => setActiveClip(1)}>
          Clip 2
        </Button>
      </div>
      <div className="flex gap-4">
        <Select
          value={captionStyle.color}
          onValueChange={(e) => setCaptionStyle({ ...captionStyle, color: e })}
        >
          <SelectTrigger className="w-[180px] px-4">
            <SelectValue
              defaultValue={captionStyle.color}
              placeholder="Pick caption color"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="white" defaultChecked>
              White
            </SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="yellow">Yellow</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={captionStyle.size}
          onValueChange={(e) => setCaptionStyle({ ...captionStyle, size: e })}
        >
          <SelectTrigger className="w-[180px] px-4">
            <SelectValue
              defaultValue={captionStyle.size}
              placeholder="Pick caption size"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0.5rem">0.5x</SelectItem>
            <SelectItem value="0.7rem">0.7x</SelectItem>
            <SelectItem value="1rem" defaultChecked>
              1x
            </SelectItem>
            <SelectItem value="1.2rem">1.2x</SelectItem>
            <SelectItem value="1.5rem">1.5x</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CaptionMenu;
