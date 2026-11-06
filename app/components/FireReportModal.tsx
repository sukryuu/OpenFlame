"use client";

import React, { useEffect, useRef, useState } from "react";
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
    const totalSteps = 3;
    const progress = (currentStep / totalSteps) * 100;
    const [reportType, setReportType] = React.useState("");
    const [otherDescription, setOtherDescription] = React.useState("");

    const [selectedLocation, setSelectedLocation] = React.useState<{
        lat: number;
        lng: number;
    } | null>(null);

    const [selectedAddress, setSelectedAddress] = React.useState("");
    const [isAddressLoading, setIsAddressLoading] = React.useState(false);

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

    useEffect(() => {
        if (!selectedLocation) {
            setSelectedAddress("");
            return;
        }

        const getAddress = async () => {
            setIsAddressLoading(true);
            setSelectedAddress("");

            try {
                const { lat, lng } = selectedLocation;

                const response = await fetch(
                    `https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${lat}&lon=${lng}`,
                );

                if (!response.ok) {
                    throw new Error("住所の取得に失敗しました");
                }

                const data = await response.json();

                if (!data.results?.muniCd) {
                    throw new Error("住所が見つかりませんでした");
                }

                const { muniCd, lv01Nm } = data.results;

                const normalizedCode = String(Number(muniCd));

                const muniResponse = await fetch(
                    "https://maps.gsi.go.jp/js/muni.js",
                );

                if (!muniResponse.ok) {
                    throw new Error("市区町村データの取得に失敗しました");
                }

                const muniText = await muniResponse.text();

                const muniLine = muniText
                    .split("\n")
                    .find((line: string) =>
                        line.includes(`GSI.MUNI_ARRAY["${normalizedCode}"]`),
                    );

                if (!muniLine) {
                    throw new Error("市区町村が見つかりませんでした");
                }

                const match = muniLine.match(/=\s*['"]([^'"]+)['"]/);

                if (!match) {
                    throw new Error("住所データの解析に失敗しました");
                }

                const municipality = match[1].split(",");

                const prefecture = municipality[1];
                const city = municipality[3];

                const address = `${prefecture}${city}${lv01Nm}`;

                setSelectedAddress(address);
            } catch (error) {
                console.error("逆ジオコーディングエラー:", error);
                setSelectedAddress("住所を取得できませんでした");
            } finally {
                setIsAddressLoading(false);
            }
        };

        getAddress();
    }, [selectedLocation]);

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
                            className="relative px-5 md:w-4/5 md:h-3/5 h-4/5 w-full max-w-200 max-h-250 bg-[#202020] border border-neutral-700 rounded-xl overflow-hidden flex flex-col"
                        >
                            <div className="flex-1 min-h-0 overflow-y-auto">
                                <div className="flex flex-col py-4">
                                    <div>
                                        <div className="flex items-end justify-between">
                                            <h1 className="font-bold text-xl chromium:text-base">
                                                火事を報告
                                            </h1>
                                            <p className="text-sm text-neutral-200">
                                                質問 {currentStep}/{totalSteps}
                                                個
                                            </p>
                                        </div>
                                        <Progress
                                            value={progress}
                                            className="w-full dark mt-4"
                                        />
                                        {currentStep === 1 && (
                                            <div>
                                                <p className="mt-4 chromium:text-sm text-base text-neutral-200">
                                                    何を目撃しましたか？
                                                </p>

                                                <div className="mt-5 bg-[#2b2b2b] p-4 rounded-sm flex flex-col gap-y-4">
                                                    <div className="grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-3 chromium:text-xs">
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
                                                            <Flame className="w-6 h-6 chromium:w-5 chromium:h-5" />
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
                                                            <WiSmoke className="w-8 h-8 chromium:w-7 chromium:h-7" />
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
                                                            <MdFireTruck className="w-6 h-6 chromium:w-5 chromium:h-5" />
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
                                                            <Info className="w-6 h-6 chromium:w-5 chromium:h-5" />
                                                            <p className="font-semibold">
                                                                その他
                                                            </p>
                                                        </button>
                                                    </div>

                                                    {reportType === "other" && (
                                                        <textarea
                                                            value={
                                                                otherDescription
                                                            }
                                                            onChange={(e) =>
                                                                setOtherDescription(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="目撃した内容を入力してください"
                                                            rows={3}
                                                            className="mt-3 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                                                        />
                                                    )}
                                                    <div className="flex items-center gap-x-2 text-red-300">
                                                        <Info size={20} />
                                                        <p className="text-sm chromium:text-xs">
                                                            近くで火災が発生している場合は、すぐに
                                                            <span>
                                                                <a href="">
                                                                    119番通報
                                                                </a>
                                                            </span>
                                                            を行ってください。
                                                        </p>
                                                    </div>
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
                                                                <p className="text-neutral-400">
                                                                    選択した住所
                                                                </p>

                                                                <p className="mt-1 font-semibold text-white">
                                                                    {isAddressLoading
                                                                        ? "住所を取得中..."
                                                                        : selectedAddress}
                                                                </p>

                                                                <p className="mt-3">
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
                                        {currentStep === 3 && (
                                            <div>
                                                <p className="mt-4 text-lg font-semibold text-white">
                                                    入力内容の確認
                                                </p>

                                                <p className="mt-2 text-sm text-neutral-400">
                                                    以下の内容で報告します。内容を確認してください。
                                                </p>

                                                <div className="mt-5 rounded-lg bg-[#2b2b2b] p-4 flex flex-col gap-y-4">
                                                    <div>
                                                        <p className="text-sm text-neutral-400">
                                                            目撃した内容
                                                        </p>
                                                        <p className="mt-1 font-semibold">
                                                            {
                                                                {
                                                                    fire: "火・炎を見た",
                                                                    smoke: "煙を見た",
                                                                    fireTruck:
                                                                        "サイレンが聞こえた・消防車を見た",
                                                                    other: "その他",
                                                                }[reportType]
                                                            }
                                                        </p>
                                                    </div>

                                                    {reportType === "other" && (
                                                        <div>
                                                            <p className="text-sm text-neutral-400">
                                                                詳細
                                                            </p>
                                                            <p className="mt-1 whitespace-pre-wrap">
                                                                {otherDescription ||
                                                                    "入力なし"}
                                                            </p>
                                                        </div>
                                                    )}

                                                    <div>
                                                        <p className="text-sm text-neutral-400">
                                                            発生場所
                                                        </p>
                                                        <p className="mt-1 font-semibold text-white">
                                                            {selectedAddress}
                                                        </p>
                                                    </div>
                                                </div>

                                                <p className="mt-4 text-xs text-neutral-400">
                                                    内容に間違いがなければ送信ボタンを押してください。
                                                    <br />
                                                    <br />
                                                    <span className="text-red-300 text-sm chromium:text-[14px]">
                                                        虚偽の情報は絶対に送信しないでください。
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-x-2 py-4 shrink-0 bg-[#202020]">
                                {currentStep === 1 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsOpenReport(false);
                                            setCurrentStep(1);
                                        }}
                                        className="chromium:text-xs text-sm w-1/3 rounded-md border border-neutral-600 bg-[#373737] hover:bg-[#3c3c3c] p-2 font-semibold"
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
                                        className="chromium:text-xs text-sm w-1/3 rounded-md border border-neutral-600 bg-[#373737] hover:bg-[#3c3c3c] p-2 font-semibold"
                                    >
                                        戻る
                                    </button>
                                )}

                                <button
                                    type="button"
                                    disabled={
                                        (currentStep === 1 &&
                                            reportType === "") ||
                                        (currentStep === 2 &&
                                            selectedLocation === null)
                                    }
                                    onClick={() => {
                                        if (currentStep < totalSteps) {
                                            setCurrentStep((step) => step + 1);
                                        } else {
                                            console.log("報告を送信");
                                        }
                                    }}
                                    className="chromium:text-xs text-sm w-full rounded-md border border-blue-600 bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition p-2 font-semibold"
                                >
                                    {currentStep === totalSteps
                                        ? "送信"
                                        : "次へ"}
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
}
