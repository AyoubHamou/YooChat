import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserFriends } from "../lib/api";
import { Link } from "react-router";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import NoFriendsFound from "../components/NoFriendsFound";
import { getLanguageFlag } from "../lib/utils.jsx";

const FriendsPage = () => {
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
    retry: false,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
        </div>
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="card bg-base-200 hover:shadow-md transition-shadow"
              >
                <div className="card-body p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="avatar size-12">
                      <img src={friend.profilePic} alt={friend.fullName} />
                    </div>
                    <h3 className="font-semibold truncate">
                      {friend.fullName}
                    </h3>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="badge badge-secondary text-xs">
                        {getLanguageFlag(friend.nativeLanguage)} Native:{" "}
                        {friend.nativeLanguage}
                      </span>
                      <span className="badge badge-outline text-xs">
                        {getLanguageFlag(friend.learningLanguage)} Learning:{" "}
                        {friend.learningLanguage}
                      </span>
                    </div>

                    {friend.bio && (
                      <p className="text-sm text-muted opacity-80">
                        {friend.bio}
                      </p>
                    )}
                  </div>

                  <Link
                    to={`/chat/${friend._id}`}
                    className="btn btn-outline w-full"
                  >
                    Message
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
