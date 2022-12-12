import { Radio, RadioGroup } from "@mui/joy";
import type { ChangeEventHandler, FunctionComponent } from "react";

export const OGRadioGroup: FunctionComponent<{
  selectedValue: string;
  setSelectedValue: (val: any) => void;
}> = ({ selectedValue, setSelectedValue }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <RadioGroup row className="self-center">
      <Radio
        checked={selectedValue === "all"}
        onChange={handleChange}
        value="all"
        name="radio-buttons"
        label="Alle"
        sx={{ color: "#1E293B" }}
      />
      <Radio
        checked={selectedValue === "joined"}
        onChange={handleChange}
        value="joined"
        name="radio-buttons"
        label="Zugesagt"
        sx={{ color: "#1E293B" }}
      />
      <Radio
        checked={selectedValue === "canceled"}
        onChange={handleChange}
        value="canceled"
        name="radio-buttons"
        label="Abgesagt"
        sx={{ color: "#1E293B" }}
      />
    </RadioGroup>
  );
};
