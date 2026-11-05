"use client";

import React, { useEffect, useRef } from "react";
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { Flame, X, Info } from "lucide-react";
import { MdFireTruck } from "react-icons/md";
import { WiSmoke } from "react-icons/wi";
import { Progress } from "@/components/ui/progress";

import FireLocationMap from "./FireLocationMap";

interface FireReportModalProps {
    isOpenReport: boolean;
    setIsOpenReport: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FireReportModal({
    isOpenReport,
    setIsOpenReport,
}: FireReportModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [currentStep, setCurrentStep] = React.useState(1);
    const totalSteps = 4;
    const progress = (currentStep / totalSteps) * 100;
    const [reportType, setReportType] = React.useState("");
    const [otherDescription, setOtherDescription] = React.useState("");

    const [selectedLocation, setSelectedLocation] = React.useState<{
        lat: number;
        lng: number;
    } | null>(null);

    useEffect(() => {
        if (isOpenReport) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpenReport]);
    return (
        <Transition show={isOpenReport} appear>
            <Dialog
                className="relative z-50"
                onClose={() => setIsOpenReport(false)}
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
                            className="relative px-5 w-4/5 max-w-200 max-h-250 bg-[#202020] border border-neutral-700 rounded-xl overflow-auto"
                        >
                            <div className="flex flex-col h-full py-4 justify-between">
                                <div>
                                    <div className="flex items-end justify-between">
                                        <h1 className="font-semibold text-xl">
                                            火事を報告
                                        </h1>
                                        <p className="text-sm text-neutral-200">
                                            質問 {currentStep}/{totalSteps}個
                                        </p>
                                    </div>
                                    <Progress
                                        value={progress}
                                        className="w-full dark mt-4"
                                    />
                                    {currentStep === 1 && (
                                        <div>
                                            <p className="mt-4 text-bg text-neutral-200">
                                                何を目撃しましたか？
                                            </p>

                                            <div className="mt-5 bg-[#2b2b2b] p-4 rounded-sm flex flex-col gap-y-4">
                                                <div className="grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-3">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setReportType(
                                                                "fire",
                                                            )
                                                        }
                                                        className={`flex flex-col rounded-lg border p-3 gap-y-2 items-center justify-center transition
                                                        ${
                                                            reportType ===
                                                            "fire"
                                                                ? "border-blue-500 bg-blue-900/30"
                                                                : "border-neutral-600 bg-[#373737] hover:bg-[#3c3c3c]"
                                                        }`}
                                                    >
                                                        <Flame size={25} />
                                                        <p className="font-semibold">
                                                            火・炎を見た
                                                        </p>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setReportType(
                                                                "smoke",
                                                            )
                                                        }
                                                        className={`flex flex-col rounded-lg border p-3 gap-y-2 items-center justify-center transition
                                                        ${
                                                            reportType ===
                                                            "smoke"
                                                                ? "border-blue-500 bg-blue-900/30"
                                                                : "border-neutral-600 bg-[#373737] hover:bg-[#3c3c3c]"
                                                        }`}
                                                    >
                                                        <WiSmoke
                                                            size={35}
                                                            className="text-white"
                                                        />
                                                        <p className="font-semibold">
                                                            煙を見た
                                                        </p>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setReportType(
                                                                "fireTruck",
                                                            )
                                                        }
                                                        className={`flex flex-col rounded-lg border p-3 gap-y-2 items-center justify-center transition
                                                        ${
                                                            reportType ===
                                                            "fireTruck"
                                                                ? "border-blue-500 bg-blue-900/30"
                                                                : "border-neutral-600 bg-[#373737] hover:bg-[#3c3c3c]"
                                                        }`}
                                                    >
                                                        <MdFireTruck
                                                            size={25}
                                                            className="text-white"
                                                        />
                                                        <p className="font-semibold">
                                                            サイレンが聞こえた
                                                            <br />
                                                            消防車を見た
                                                        </p>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setReportType(
                                                                "other",
                                                            )
                                                        }
                                                        className={`flex flex-col rounded-lg border p-3 gap-y-2 items-center justify-center transition
                                                        ${
                                                            reportType ===
                                                            "other"
                                                                ? "border-blue-500 bg-blue-900/30"
                                                                : "border-neutral-600 bg-[#373737] hover:bg-[#3c3c3c]"
                                                        }`}
                                                    >
                                                        <Info
                                                            size={25}
                                                            className="text-white"
                                                        />
                                                        <p className="font-semibold">
                                                            その他
                                                        </p>
                                                    </button>
                                                </div>

                                                {reportType === "other" && (
                                                    <textarea
                                                        value={otherDescription}
                                                        onChange={(e) =>
                                                            setOtherDescription(
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="目撃した内容を入力してください"
                                                        rows={3}
                                                        className="mt-3 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {currentStep === 2 && (
                                        <>
                                            <p className="mt-3 text-neutral-200">
                                                火事はどこで発生していますか？
                                            </p>

                                            <p className="mt-2 text-xs text-neutral-400">
                                                地図をクリックして発生場所を指定してください。
                                            </p>

                                            <div className="mt-5 bg-[#2b2b2b] p-3 rounded-lg">
                                                <FireLocationMap
                                                    selectedLocation={
                                                        selectedLocation
                                                    }
                                                    onLocationSelect={
                                                        setSelectedLocation
                                                    }
                                                />

                                                <div className="mt-3 text-sm text-neutral-300">
                                                    {selectedLocation ? (
                                                        <div>
                                                            <p>
                                                                緯度：
                                                                {selectedLocation.lat.toFixed(
                                                                    6,
                                                                )}
                                                            </p>

                                                            <p>
                                                                経度：
                                                                {selectedLocation.lng.toFixed(
                                                                    6,
                                                                )}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <p className="text-neutral-400">
                                                            まだ場所が選択されていません。
                                                        </p>
                                                    )}
                                                </div>
                                                <p className="mt-2 text-xs text-neutral-400">
                                                    正確な位置は公開されません。
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="flex gap-x-2 mt-4">
                                    {currentStep === 1 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsOpenReport(false);
                                                setCurrentStep(1);
                                            }}
                                            className="w-1/3 rounded-md border border-neutral-600 bg-[#373737] hover:bg-[#3c3c3c] p-2 font-semibold text-sm"
                                        >
                                            キャンセル
                                        </button>
                                    )}

                                    {currentStep > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCurrentStep((step) =>
                                                    Math.max(step - 1, 1),
                                                );
                                            }}
                                            className="w-1/3 rounded-md border border-neutral-600 bg-[#373737] hover:bg-[#3c3c3c] p-2 font-semibold text-sm"
                                        >
                                            戻る
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        disabled={
                                            currentStep === 2 &&
                                            selectedLocation === null
                                        }
                                        onClick={() => {
                                            if (currentStep < totalSteps) {
                                                setCurrentStep(
                                                    (step) => step + 1,
                                                );
                                            } else {
                                                console.log("報告を送信");
                                            }
                                        }}
                                        className="w-full rounded-md border border-blue-600 bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition p-2 font-semibold text-sm"
                                    >
                                        {currentStep === totalSteps
                                            ? "送信"
                                            : "次へ"}
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
}
