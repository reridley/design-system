import { Button as MuiButton, ButtonProps } from "@mui/material";
// import soundManager from "Utilities/sound-manager";
import { forwardRef, MouseEventHandler } from "react";

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { onClick, ...props },
  ref,
) {
  const onClickButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);
    // soundManager.playSound("button-click");
  };

  return <MuiButton {...props} onClick={onClickButton} ref={ref} />;
});
