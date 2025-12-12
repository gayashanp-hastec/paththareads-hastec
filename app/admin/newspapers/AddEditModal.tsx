"use client";

import { useState } from "react";

const DEFAULT_AD_TYPE = {
  typeKey: "classified",
  name: "",
  baseType: "",
  countFirstWords: 0,
  basePrice: 0,
  additionalWordPrice: 0,
  colorOptions: [],
  tintColorPrice: 0,
  isAllowCombined: false,
  maxWords: 0,
  categories: "",
  imgUrl: "",
  isUploadImage: false,
  extraNotes1: "",
  extraNotes2: "",
};

const AD_TYPE_OPTIONS = [
  "classified",
  "photo_classified",
  "casual",
  "death_notice",
];

export default function AddEditModal({ item, onClose, onSaved }: any) {
  const [form, setForm] = useState(
    item || {
      name: "",
      type: "Daily",
      noColPerPage: "",
      colWidth: "",
      colHeight: "",
      minAdHeight: "",
      tintAdditionalCharge: "",
      newspaperimg: "",
      typeofAd: {},
    }
  );

  const [adTypes, setAdTypes] = useState(
    item
      ? Object.entries(item.typeofAd).map(([key, value]: any) => ({
          typeKey: key,
          ...value,
          categories: value.categories?.join(", ") || "",
        }))
      : []
  );

  const [uploadingImage, setUploadingImage] = useState(false);

  const addNewAdType = () => {
    setAdTypes([...adTypes, { ...DEFAULT_AD_TYPE }]);
  };

  const updateAdType = (index: number, key: string, value: any) => {
    const updated = [...adTypes];
    updated[index][key] = value;
    setAdTypes(updated);
  };

  // ---------------- Handle newspaper image upload ----------------
  const handleNewspaperImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);

    // Generate unique filename
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const ext = file.name.split(".").pop();
    const fileName = `${form.name
      .replace(/\s+/g, "")
      .toLowerCase()}${randomNum}.${ext}`;

    // Upload to API
    const formData = new FormData();
    formData.append("file", new File([file], fileName));

    try {
      const res = await fetch("/api/uploadNewspaperImage", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.fileName) {
        setForm({ ...form, newspaperimg: data.fileName });
      }
    } catch (err) {
      console.error("Image upload failed", err);
    }

    setUploadingImage(false);
  };

  const save = async () => {
    const formattedTypes: any = {};

    adTypes.forEach((t) => {
      formattedTypes[t.typeKey] = {
        name: t.name,
        baseType: t.baseType,
        countFirstWords: Number(t.countFirstWords),
        basePrice: Number(t.basePrice),
        additionalWordPrice: Number(t.additionalWordPrice),
        colorOptions: t.colorOptions,
        tintColorPrice: Number(t.tintColorPrice),
        isAllowCombined: Boolean(t.isAllowCombined),
        maxWords: Number(t.maxWords),
        categories: t.categories
          ? t.categories.split(",").map((c: string) => c.trim())
          : [],
        imgUrl: t.imgUrl,
        isUploadImage: Boolean(t.isUploadImage),
        extraNotes1: t.extraNotes1,
        extraNotes2: t.extraNotes2,
      };
    });

    const finalPayload = {
      ...form,
      typeofAd: formattedTypes,
    };

    const method = item ? "PUT" : "POST";
    const url = item ? `/api/newspapers/${item.id}` : "/api/newspapers";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalPayload),
    });

    onSaved();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start p-10 overflow-auto z-50">
      <div className="bg-white rounded-xl p-6 w-[900px] shadow-xl space-y-6">
        <h2 className="text-2xl font-bold">
          {item ? "Edit Newspaper" : "Add Newspaper"}
        </h2>

        {/* Newspaper Details */}
        <div className="border p-4 rounded-xl bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Newspaper Details</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Newspaper Name
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Type</label>
              <select
                disabled={!!item}
                className="w-full border p-2 rounded"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option>Daily</option>
                <option>Sunday</option>
              </select>
            </div>

            {/* Newspaper Image Upload */}
            <div className="col-span-2">
              <label className="block text-sm font-medium">
                Newspaper Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleNewspaperImage}
                className="w-full border p-2 rounded"
              />
              {uploadingImage && (
                <p className="text-sm text-gray-500">Uploading...</p>
              )}
              {form.newspaperimg && (
                <p className="text-sm mt-1">Uploaded: {form.newspaperimg}</p>
              )}
            </div>

            {/* Other fields */}
            <div>
              <label className="block text-sm font-medium">
                Columns per Page
              </label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={form.noColPerPage}
                onChange={(e) =>
                  setForm({ ...form, noColPerPage: Number(e.target.value) })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Column Width</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={form.colWidth}
                onChange={(e) =>
                  setForm({ ...form, colWidth: Number(e.target.value) })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Column Height</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={form.colHeight}
                onChange={(e) =>
                  setForm({ ...form, colHeight: Number(e.target.value) })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Minimum Ad Height
              </label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={form.minAdHeight}
                onChange={(e) =>
                  setForm({ ...form, minAdHeight: Number(e.target.value) })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Tint Additional Charge
              </label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={form.tintAdditionalCharge}
                onChange={(e) =>
                  setForm({
                    ...form,
                    tintAdditionalCharge: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Types of Ads */}
        <div className="border p-4 rounded-xl bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Types of Ads</h3>
            <button
              onClick={addNewAdType}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              + Add Type
            </button>
          </div>

          {adTypes.length === 0 && (
            <p className="text-gray-600 text-sm">No ad types added yet.</p>
          )}

          {adTypes.map((t, index) => (
            <div key={index} className="border rounded-xl p-4 mb-4 bg-white">
              <h4 className="font-bold text-md mb-3">Ad Type #{index + 1}</h4>

              <div className="grid grid-cols-2 gap-4">
                {/* Select typeKey */}
                <div>
                  <label className="block text-sm font-medium">
                    Select Type Key
                  </label>
                  <select
                    className="w-full border p-2 rounded"
                    value={t.typeKey}
                    onChange={(e) =>
                      updateAdType(index, "typeKey", e.target.value)
                    }
                  >
                    {AD_TYPE_OPTIONS.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Display Name
                  </label>
                  <input
                    className="w-full border p-2 rounded"
                    value={t.name}
                    onChange={(e) =>
                      updateAdType(index, "name", e.target.value)
                    }
                  />
                </div>

                {/* Remaining ad type fields ... (same as previous code) */}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Save Newspaper
          </button>
        </div>
      </div>
    </div>
  );
}
