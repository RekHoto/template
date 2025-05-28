import React, { useState } from "react";
import Typography from "@/ui/Typography/Typography";
import Panel from "@/ui/Panel/Panel";
import Button, { ButtonVariant } from "@/ui/Button/Button";
import ChipsSelect from "@/ui/ChipsSelect/ChipsSelect";
import { OptionI } from "@/utils/types";
import DropdownSelector from "@/ui/DropdownSelector/DropdownSelector";
import { CloseIcon } from "@/assets/icons";
import cls from "./styles.module.scss";

const Door = () => {
  const scene = document.getElementById("scene");

  scene.addEventListener("click", () => {
    scene.classList.toggle("open");
  });
  return (
    <div className={cls.scene} id="scene">
      <div className={cls.door}>
        <div className={cls.handle} />
      </div>
    </div>
  );
};

const ButtonCol = ({ variant }: { variant: ButtonVariant }) => {
  return (
    <div className={cls.gridColumn}>
      <Typography variant="h6">Primary</Typography>
      <Button
        onClick={() => null}
        variant={variant}
        icon={variant === "iconOnly" && <CloseIcon />}
        label="Button"
      />
      <Button
        onClick={() => null}
        variant={variant}
        icon={variant === "iconOnly" && <CloseIcon />}
        label="Button"
        disabled
      />
      <Button
        onClick={() => null}
        variant={variant}
        icon={variant === "iconOnly" && <CloseIcon />}
        label="Button"
        loading
      />
      <Button
        onClick={() => null}
        variant={variant}
        label="Button"
        icon={<CloseIcon />}
      />
      <Button
        onClick={() => null}
        variant={variant}
        label="Button"
        icon={<CloseIcon />}
        disabled
      />
      <Button
        onClick={() => null}
        variant={variant}
        label="Button"
        icon={<CloseIcon />}
        loading
      />
    </div>
  );
};

const options: OptionI[] = [
  { value: "Option 1", label: "Option 1" },
  { value: "Option 2", label: "Option 2" },
  { value: "Option 3", label: "Option 3" },
  { value: "Option 4", label: "Option 4" },
  { value: "Option 5", label: "Option 5" },
];

export const PlaygroundPage = () => {
  const [selected, setSelected] = useState(options[0].value);
  const [selectedArr, setSelectedArr] = useState<OptionI[]>([options[0]]);
  return (
    <Panel className={cls.wrapper}>
      <Door />
      <Panel>
        <Typography variant="h1">Example Text 123 | H1</Typography>
        <Typography variant="h2">Example Text 123 | H2</Typography>
        <Typography variant="h3">Example Text 123 | H3</Typography>
        <Typography variant="h4">Example Text 123 | H4</Typography>
        <Typography variant="h5">Example Text 123 | H5</Typography>
        <Typography variant="h6">Example Text 123 | H6</Typography>
        <Typography variant="body1">Example Text 123 | Body 1</Typography>
        <Typography variant="body2">Example Text 123 | Body 2</Typography>
        <Typography variant="body3">Example Text 123 | Body 3</Typography>
        <Typography variant="caption">Example Text 123| Caption</Typography>
      </Panel>

      <div className={cls.row}>
        <Panel className={cls.buttons}>
          <div className={cls.gridColumn}>
            <Typography variant="h6">Name</Typography>
            <Typography variant="h6">Default</Typography>
            <Typography variant="h6">Disabled</Typography>
            <Typography variant="h6">Loading</Typography>
            <Typography variant="h6">With icon</Typography>
            <Typography variant="h6">With icon (Disabled)</Typography>
            <Typography variant="h6">With icon (Loading)</Typography>
          </div>
          <ButtonCol variant="primary" />
          <ButtonCol variant="outlined" />
          <ButtonCol variant="text" />
          <ButtonCol variant="danger" />
          <ButtonCol variant="iconOnly" />
        </Panel>
        <Panel>
          <ChipsSelect
            options={options}
            selected={selectedArr}
            onChange={setSelectedArr}
            maxVisibleChips={3}
          />
          <DropdownSelector
            options={options}
            value={selected}
            onChange={setSelected}
          />
        </Panel>
      </div>
    </Panel>
  );
};
