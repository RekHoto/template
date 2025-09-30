import React, { useState } from "react";
import Typography from "@/ui/Typography/Typography";
import Panel from "@/ui/Panel/Panel";
import Button, { ButtonVariant } from "@/ui/Button/Button";
import ChipsSelect from "@/ui/ChipsSelect/ChipsSelect";
import { OptionI } from "@/utils/types";
import DropdownSelector from "@/ui/DropdownSelector/DropdownSelector";
import { CloseIcon } from "@/assets/icons";
import cls from "./styles.module.scss";

const ButtonCol = ({ variant }: { variant: ButtonVariant }) => {
  return (
    <div className={cls.gridColumn}>
      <Typography size="xl">Primary</Typography>
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
      <Panel>
        <Typography size="7xl">Example Text 123 | 7xl</Typography>
        <Typography size="6xl">Example Text 123 | 6xl</Typography>
        <Typography size="5xl">Example Text 123 | 5xl</Typography>
        <Typography size="4xl">Example Text 123 | 4xl</Typography>
        <Typography size="3xl">Example Text 123 | 3xl</Typography>
        <Typography size="2xl">Example Text 123 | 2xl</Typography>
        <Typography size="xl">Example Text 123 | xl</Typography>
        <Typography size="lg">Example Text 123 | lg</Typography>
        <Typography size="md">Example Text 123 | md</Typography>
        <Typography size="sm">Example Text 123 | sm</Typography>
        <Typography size="xs">Example Text 123 | xs</Typography>
      </Panel>

      <div className={cls.row}>
        <Panel className={cls.buttons}>
          <div className={cls.gridColumn}>
            <Typography size="xl">Name</Typography>
            <Typography size="xl">Default</Typography>
            <Typography size="xl">Disabled</Typography>
            <Typography size="xl">Loading</Typography>
            <Typography size="xl">With icon</Typography>
            <Typography size="xl">With icon (Disabled)</Typography>
            <Typography size="xl">With icon (Loading)</Typography>
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
