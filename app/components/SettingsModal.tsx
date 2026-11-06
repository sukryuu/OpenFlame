import React, { useEffect, useRef } from "react";
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { SquareArrowOutUpRight } from "lucide-react";

export default function Modal({
    isOpenModal,
    setIsOpenModal,
}: {
    isOpenModal: boolean;
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpenModal) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpenModal]);

    return (
        <Transition show={isOpenModal} appear>
            <Dialog
                className="relative z-50"
                onClose={() => setIsOpenModal(false)}
            >
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 flex items-center justify-center p-4 text-white">
                    <TransitionChild
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95 translate-y-2"
                        enterTo="opacity-100 scale-100 translate-y-0"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100 translate-y-0"
                        leaveTo="opacity-0 scale-95 translate-y-2"
                    >
                        <DialogPanel
                            ref={modalRef}
                            className="relative p-5 md:w-4/5 md:h-3/5 h-4/5 w-full max-w-200 max-h-250 bg-[#202020] border border-neutral-700 rounded-xl overflow-auto"
                        >
                            <h1 className="font-semibold text-xl">
                                クレジット
                            </h1>

                            <div className="mt-5 bg-[#2b2b2b] p-4 rounded-sm flex flex-col gap-y-4">
                                <div className="flex items-center gap-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                                        />
                                    </svg>

                                    <h2 className="text-xs text-neutral-300">
                                        地図
                                    </h2>
                                </div>
                                <div>
                                    <div className="flex items-center gap-x-1">
                                        <a
                                            className="font-semibold"
                                            href="https://www.data.jma.go.jp/developer/gis.html"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            気象庁 予報区等GISデータの一覧 -
                                            政府標準利用規約（第2.0版）
                                        </a>
                                        <SquareArrowOutUpRight
                                            size={12}
                                            className="text-neutral-300"
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-1">
                                        <a
                                            className="font-semibold"
                                            href="https://maplibre.org"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            MapLibre GL JS - BSD 3-Clause
                                        </a>
                                        <SquareArrowOutUpRight
                                            size={12}
                                            className="text-neutral-300"
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-1">
                                        <a
                                            className="font-semibold"
                                            href="https://openfreemap.org/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            OpenFreeMap - MIT License
                                        </a>
                                        <SquareArrowOutUpRight
                                            size={12}
                                            className="text-neutral-300"
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-1">
                                        <a
                                            className="font-semibold"
                                            href="https://www.openstreetmap.org/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            ©OpenStreetMap contributors - ODbL
                                        </a>
                                        <SquareArrowOutUpRight
                                            size={12}
                                            className="text-neutral-300"
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-1">
                                        <a
                                            className="font-semibold"
                                            href="https://openmaptiles.org/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            OpenMapTiles - BSD 3-Clause
                                        </a>
                                        <SquareArrowOutUpRight
                                            size={12}
                                            className="text-neutral-300"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 6.75h15m-15 5.25h15m-15 5.25h15"
                                        />
                                    </svg>

                                    <h2 className="text-xs text-neutral-300">
                                        UI
                                    </h2>
                                </div>
                                <div>
                                    <div className="flex items-center gap-x-1">
                                        <a
                                            className="font-semibold"
                                            href="https://headlessui.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Headless UI - MIT License
                                        </a>
                                        <SquareArrowOutUpRight
                                            size={12}
                                            className="text-neutral-300"
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-1">
                                        <a
                                            className="font-semibold"
                                            href="https://ui.shadcn.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            shadcn/ui - MIT License
                                        </a>
                                        <SquareArrowOutUpRight
                                            size={12}
                                            className="text-neutral-300"
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-1">
                                        <a
                                            className="font-semibold"
                                            href="https://base-ui.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Base UI - MIT License
                                        </a>
                                        <SquareArrowOutUpRight
                                            size={12}
                                            className="text-neutral-300"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                        />
                                    </svg>

                                    <h2 className="text-xs text-neutral-300">
                                        アイコン
                                    </h2>
                                </div>
                                <div>
                                    <div className="flex items-center gap-x-1">
                                        <a
                                            className="font-semibold"
                                            href="https://heroicons.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Heroicons - MIT Lisence
                                        </a>
                                        <SquareArrowOutUpRight
                                            size={12}
                                            className="text-neutral-300"
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-1">
                                        <a
                                            className="font-semibold"
                                            href="https://lucide.dev/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Lucide - ISC License / MIT License
                                        </a>
                                        <SquareArrowOutUpRight
                                            size={12}
                                            className="text-neutral-300"
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-1">
                                        <a
                                            className="font-semibold"
                                            href="https://react-icons.github.io/react-icons/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            React Icons - MIT License / CC BY
                                            4.0 / Apache 2.0
                                        </a>
                                        <SquareArrowOutUpRight
                                            size={12}
                                            className="text-neutral-300"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
                                        />
                                    </svg>

                                    <h2 className="text-xs text-neutral-300">
                                        リバース ジオコーディング
                                    </h2>
                                </div>
                                <div>
                                    <div className="flex items-center gap-x-1">
                                        <a
                                            className="font-semibold"
                                            href="https://github.com/gsi-cyberjapan/gsimaps"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            国土地理院 API -
                                            公共データ利用規約（第1.0版）（PDL1.0）
                                        </a>
                                        <SquareArrowOutUpRight
                                            size={12}
                                            className="text-neutral-300"
                                        />
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
}
