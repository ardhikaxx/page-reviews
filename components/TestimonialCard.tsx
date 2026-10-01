"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import RatingStars from "./RatingStars";

export interface Testimonial {
  id: string;
  userId: string;
  name: string;
  email: string;
  photoURL: string | null;
  message: string;
  rating: number;
  createdAt: number;
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = testimonial.createdAt
    ? formatDistanceToNow(new Date(testimonial.createdAt), { addSuffix: true, locale: id })
    : "Baru saja";

  const maskedName = testimonial.name
    ? testimonial.name.split(" ").map(word => word.length > 0 ? word[0] + "***" : "").join(" ")
    : "A***";

  const MAX_LENGTH = 150;
  const shouldTruncate = testimonial.message.length > MAX_LENGTH;
  const displayMessage = shouldTruncate && !isExpanded 
    ? testimonial.message.slice(0, MAX_LENGTH).trim() + "..." 
    : testimonial.message;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-7 flex flex-col h-full shadow-sm shadow-black/20 relative overflow-hidden transition-all duration-300" style={{ boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)' }}>
      {/* Decorative Quote Icon */}
      <svg 
        className="absolute top-4 right-4 w-16 h-16 text-white opacity-[0.03] pointer-events-none" 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      <div className="mb-4 relative z-10">
        <RatingStars rating={testimonial.rating} maxRating={5} className="scale-90 origin-left" />
      </div>
      
      <div className="flex-grow mb-6">
        <p className="text-[#D1D5DB] text-[15px] leading-relaxed transition-all duration-300">
          {displayMessage}
        </p>
        {shouldTruncate && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-red-400 hover:text-red-300 text-[13px] font-medium mt-2 transition-colors focus:outline-none"
          >
            {isExpanded ? "Tutup" : "Baca selengkapnya"}
          </button>
        )}
      </div>
      
      <div className="flex items-center gap-3 mt-auto">
        {testimonial.photoURL ? (
          <img
            src={testimonial.photoURL}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center font-medium text-sm">
            {testimonial.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-white">
            {maskedName}
          </h3>
          <span className="text-[13px] text-[#9CA3AF] mt-0.5">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
