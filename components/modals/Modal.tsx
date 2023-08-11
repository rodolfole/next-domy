"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../Button";

interface ModalProps {
  actionLabel: string;
  body?: React.ReactElement;
  disabled?: boolean;
  footer?: React.ReactElement;
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  title?: string;
}

const Modal: FC<ModalProps> = ({
  actionLabel,
  body,
  disabled,
  footer,
  isOpen,
  onClose,
  onSubmit,
  secondaryAction,
  secondaryActionLabel,
  title,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          bg-neutral-800/70
          fixed 
          flex 
          focus:outline-none
          inset-0 
          items-center 
          justify-center 
          outline-none 
          overflow-x-hidden 
          overflow-y-auto 
          z-50 
        "
      >
        <div
          className="
            h-full 
            lg:h-auto
            lg:w-3/6
            md:h-auto
            md:w-4/6
            mx-auto 
            my-6
            relative 
            w-full
            xl:w-2/5
          "
        >
          {/*content*/}
          <div
            className={`
            duration-300
            h-full
            ${showModal ? "opacity-100" : "opacity-0"}
            translate
            ${showModal ? "translate-y-0" : "translate-y-full"}
          `}
          >
            <div
              className="
              bg-white 
              border-0 
              flex 
              flex-col 
              focus:outline-none
              h-full
              lg:h-auto
              md:h-auto
              outline-none 
              relative 
              rounded-lg 
              shadow-lg 
              translate
              w-full 
            "
            >
              {/*header*/}
              <div
                className="
                    border-b-[1px]
                    flex 
                    items-center 
                    justify-center
                    p-6
                    relative
                    rounded-t
                "
              >
                <button
                  className="
                    absolute
                    border-0 
                    hover:opacity-70
                    left-9
                    p-1
                    transition
                  "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="font-semibold text-lg">{title}</div>
              </div>
              {/*body*/}
              <div className="flex-auto p-6 relative">{body}</div>
              {/*footer*/}
              <div className="flex flex-col gap-2 p-6">
                <div
                  className="
                    flex 
                    flex-row 
                    gap-4 
                    items-center 
                    w-full
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
