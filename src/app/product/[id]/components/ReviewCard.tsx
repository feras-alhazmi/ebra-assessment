import StarRating from "@/app/components/StarRating";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface ReviewCardProps {
  name: string;
  avatar: string;
  comment: string;
  timeAgo: string;
  rating: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  avatar,
  comment,
  timeAgo,
  rating,
}) => {
  return (
    <div className="flex items-start space-x-6 py-6 border-b">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={avatar}
          alt={name}
          width={48}
          height={48}
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="text-lg font-semibold mb-2 text-gray-900">{name}</h4>

        {/* Star rating */}
        <StarRating rating={rating} />

        {/* Comment */}
        <p className="text-sm text-gray-700 leading-relaxed mt-4">{comment}</p>

        {/* Footer */}
        <div className="mt-3 flex space-x-4 text-xs ml-20 font-medium">
          <button className="hover:underline">Like</button>
          <button className="hover:underline">Reply</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
