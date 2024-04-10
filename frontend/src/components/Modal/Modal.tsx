import * as React from "react";
import cn from "classnames";
import ReactDOM from "react-dom";
import Button from "../Button/Button";

interface ModalProps {
  /** Modal content */
  children: React.ReactNode;
  /** Classname to style modal wrapper */
  wrapperClass?: string;
  /** Modal header title */
  header?: string;
  /** Determines either to modal header is shown or not
   * useful for confirmation modals
   */
  showHeader?: boolean;
  /** make close Icon visible or not */
  closable?: boolean;
  /** function to call if the close Icon is clicked */
  onCloseButton: () => void;
  /** function to call if the mask is clicked */
  onMaskClose?: () => void;
  /** function to call if the ok button is clicked */
  onOkClick?: () => void;
  /** function to call if the cancel button is clicked */
  onCancelClick?: () => void;
  /** Text of the OK button */
  okText?: string;
  /** Text of the Cancel button */
  cancelText?: string;
  /** show or hide the footer  */
  showFooter?: boolean;
  /** show or hide back button */
  isOkBtnDisabled?: boolean;
  /** disable cancel button */
  isCancelBtnDisabled?: boolean;
  /** disable back button */
  isBackBtnDisabled?: boolean;
  /** submit button form value (use this to link a button to a form anywhere in the document) */
  submitBtnFormValue?: string;
}

export default function Modal({
  children,
  closable = true,
  header,
  showHeader = true,
  onCloseButton,
  onMaskClose,
  onCancelClick,
  onOkClick,
  okText,
  cancelText,
  submitBtnFormValue,
  showFooter = false,
  isOkBtnDisabled,
  isCancelBtnDisabled,
  wrapperClass,
}: ModalProps) {
  const modalRoot = document.getElementById("modal--root") as HTMLElement;

  const content: React.ReactNode = (
    <>
      <div
        className="h-[100vh] z-[7] overflow-hidden fixed w-full left-0 top-0 cursor-pointer bg-[#000000b3] inset-0 backdrop-blur-sm pointer-events-auto"
        onClick={
          isCancelBtnDisabled && isOkBtnDisabled ? undefined : onCloseButton
        }
        role="button"
        tabIndex={0}
        onKeyPress={onCloseButton || onMaskClose}
        aria-label="maskClose"
      />

      <div
        className={cn(
          "fixed left-[25%] max-[900px]:left-[3%] top-[25%] transform-[translate(-50%, -50%)] bg-white w-[36.3rem] max-w-[95%] rounded-[8px] z-[8] p20 overflow-scroll",
          wrapperClass
        )}
      >
        <div className="flex flex-col justify-between">
          {showHeader && (
            <div className="flex justify-between items-center py-8 px-24 h-[4.4rem] border-b border-b-[#eceef2]">
              <span className={cn("text-sm font-medium", "fs-exclude")}>
                {header}
              </span>
              {closable && (
                <button
                  onClick={onCloseButton}
                  type="button"
                  className="h-[2.3rem] w-[2.3rem] rounded-full bg-[#eceef2] "
                  aria-label="closeModal"
                >
                  X
                </button>
              )}
            </div>
          )}
          <div className="py-32 px-24 overflow-auto flex-1">{children}</div>
          {showFooter && (
            <div className="border-t border-t-[#eceef2] flex gap-x-10">
              <div className="h-auto  ml-auto">
                {cancelText && (
                  <Button
                    type="button"
                    className="w-[9rem] bg-[#b9baa333] text-gray"
                    onClick={onCancelClick}
                    disabled={isCancelBtnDisabled}
                  >
                    {cancelText}
                  </Button>
                )}
              </div>

              <div className="mr-10 pb-10">
                <Button
                  onClick={onOkClick}
                  className="px-20 w-[9rem]"
                  type="submit"
                  form={submitBtnFormValue}
                  disabled={isOkBtnDisabled}
                >
                  {okText}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(content, modalRoot);
}
