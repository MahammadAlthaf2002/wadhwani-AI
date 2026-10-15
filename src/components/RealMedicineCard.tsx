import React, { useState } from 'react';
import { Pill, Download, Eye, ExternalLink, CheckCircle2, AlertTriangle, X, ShieldCheck, Tag } from 'lucide-react';

export interface VisualCardData {
  itemTitle: string;
  genericName?: string;
  image: string;
  backImage?: string;
  mrp?: string;
  pharmacyAdvice?: string;
  howToTake: string;
  precautions: string;
}

interface RealMedicineCardProps {
  card: VisualCardData;
  compact?: boolean;
}

export const RealMedicineCard: React.FC<RealMedicineCardProps> = ({ card, compact = false }) => {
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const hasBackImage = Boolean(card.backImage && card.backImage !== card.image);
  const currentImageUrl = activeSide === 'front' || !hasBackImage ? card.image : card.backImage!;

  // Handle direct download of the image to device gallery/storage
  const handleDownloadImage = (e: React.MouseEvent, imgUrl: string, sideLabel: string) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = imgUrl;
    // Format a friendly download file name
    const sanitizedTitle = (card.genericName || card.itemTitle)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .slice(0, 30);
    link.download = `${sanitizedTitle}_${sideLabel}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition text-left">
        {/* Card Header */}
        <div className="bg-slate-100/90 px-3.5 py-2.5 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Pill className="w-3.5 h-3.5" />
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                {card.itemTitle}
              </h4>
              {card.genericName && (
                <span className="text-[10px] text-blue-700 font-medium block">
                  Generic: {card.genericName}
                </span>
              )}
            </div>
          </div>

          {/* Front / Back Toggle if backImage exists */}
          {hasBackImage && (
            <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setActiveSide('front')}
                className={`px-2 py-1 rounded-md transition ${
                  activeSide === 'front'
                    ? 'bg-white text-blue-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Front Pack
              </button>
              <button
                type="button"
                onClick={() => setActiveSide('back')}
                className={`px-2 py-1 rounded-md transition ${
                  activeSide === 'back'
                    ? 'bg-white text-blue-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Back Foil
              </button>
            </div>
          )}
        </div>

        {/* Card Main Body */}
        <div className={`p-3.5 sm:p-4 flex flex-col ${compact ? 'gap-3' : 'sm:flex-row gap-4'} items-start`}>
          {/* Packaging Photo View */}
          <div className="relative group w-full sm:w-44 shrink-0 rounded-xl overflow-hidden border border-slate-300 bg-slate-100 aspect-4/3 flex items-center justify-center">
            <img
              src={currentImageUrl}
              alt={`${card.itemTitle} - ${activeSide} view`}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300 cursor-pointer"
              onClick={() => setIsPreviewOpen(true)}
              loading="lazy"
            />

            {/* Side Label Badge */}
            <span className="absolute top-2 left-2 bg-slate-900/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
              {activeSide === 'front' ? 'FRONT VIEW' : 'BACK (FOIL/BATCH)'}
            </span>

            {/* Quick Action Overlay on Hover / Tap */}
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 pointer-events-none group-hover:pointer-events-auto">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="bg-white/95 text-slate-800 text-[11px] font-bold px-2.5 py-1.5 rounded-lg flex items-center space-x-1 shadow-md hover:bg-white"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Zoom</span>
              </button>
            </div>
          </div>

          {/* Details & Pharmacy Instructions */}
          <div className="flex-1 w-full space-y-2.5 text-xs text-left">
            {/* MRP & Chemist Tag */}
            {card.mrp && (
              <div className="flex items-center space-x-2 text-[11px]">
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md flex items-center space-x-1">
                  <Tag className="w-3 h-3" />
                  <span>{card.mrp}</span>
                </span>
                <span className="text-slate-500 text-[10px]">
                  (Show real packaging photo to pharmacist)
                </span>
              </div>
            )}

            {/* How to Take */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-2.5 text-emerald-950">
              <div className="flex items-center space-x-1.5 font-bold mb-1 text-emerald-800 text-[10px] uppercase tracking-wide">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Recommended Usage & Dosage:</span>
              </div>
              <p className="leading-relaxed text-[11px] sm:text-xs">{card.howToTake}</p>
            </div>

            {/* Precaution */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 text-amber-950">
              <div className="flex items-center space-x-1.5 font-bold mb-1 text-amber-800 text-[10px] uppercase tracking-wide">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Precautions & Medical Safety:</span>
              </div>
              <p className="leading-relaxed text-[11px] sm:text-xs">{card.precautions}</p>
            </div>

            {/* ACTION BUTTONS: Download to Phone Gallery & View Both Sides */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={(e) => handleDownloadImage(e, currentImageUrl, activeSide)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center space-x-1.5 shadow-xs transition"
                title="Save high-resolution photo to your phone gallery to show at medical shop"
              >
                <Download className="w-3.5 h-3.5" />
                <span>📥 Download Image to Gallery</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-3 py-2 rounded-xl flex items-center space-x-1.5 transition border border-slate-200"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>Show Both Sides (Chemist Slip)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pharmacy Helper Footer */}
        {card.pharmacyAdvice && (
          <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 text-[11px] text-slate-600 flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{card.pharmacyAdvice}</span>
          </div>
        )}
      </div>

      {/* FULL-SIZE PHOTO PREVIEW MODAL (SHOWING FRONT & BACK TO MEDICAL STORE) */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                  Authentic Medicine Packaging Slip
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {card.itemTitle}
                </h3>
                {card.genericName && (
                  <p className="text-xs text-slate-600 font-medium">
                    Generic: {card.genericName} {card.mrp ? `• ${card.mrp}` : ''}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Instruction Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-center justify-between flex-wrap gap-2">
              <span>
                💡 <strong>Instructions for Medical Store:</strong> Show this photo or downloaded image to the pharmacist to dispense the exact generic formulation.
              </span>
            </div>

            {/* Front & Back Images Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Front Photo */}
              <div className="bg-slate-50 border border-slate-300 rounded-2xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Front Pack (Tablets / Sachet)
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleDownloadImage(e, card.image, 'front')}
                    className="text-blue-700 hover:text-blue-800 text-[11px] font-bold flex items-center space-x-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download Front</span>
                  </button>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-white aspect-4/3 flex items-center justify-center">
                  <img
                    src={card.image}
                    alt={`${card.itemTitle} front pack`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Back Photo (if available) */}
              <div className="bg-slate-50 border border-slate-300 rounded-2xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Back Pack (Foil, MRP, Batch & Warnings)
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleDownloadImage(e, card.backImage || card.image, 'back')}
                    className="text-blue-700 hover:text-blue-800 text-[11px] font-bold flex items-center space-x-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download Back</span>
                  </button>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-white aspect-4/3 flex items-center justify-center">
                  <img
                    src={card.backImage || card.image}
                    alt={`${card.itemTitle} back foil`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Clinical Usage Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2 text-left">
              <div>
                <strong className="text-slate-800">Usage Instructions:</strong>
                <p className="text-slate-600 mt-0.5">{card.howToTake}</p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <strong className="text-amber-800">Precautions:</strong>
                <p className="text-slate-600 mt-0.5">{card.precautions}</p>
              </div>
            </div>

            {/* Footer Close */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
