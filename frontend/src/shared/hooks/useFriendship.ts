import { notifications } from "@mantine/notifications"
import { useEffect } from "react"

import { FriendshipService } from "../api/friendship.service"
import { getSocket } from "../api/socket.service"
import { useFriendshipStore } from "../stores/friendship/friendship.store"
import { useAuth } from "../stores/user/useAuth"

export const useFriendship = () => {
  const friendshipStore = useFriendshipStore()
  const {
    user: { id },
  } = useAuth()

  const acceptFriendRequest = async (requestId: string) => {
    const socket = getSocket(id)
    socket?.emit("acceptFriendRequest", { requestId })

    return new Promise((resolve, reject) => {
      socket?.once("friendRequestAccepted", (data) => {
        console.log("Friend request accepted:", data)
        friendshipStore.removeRequest(requestId)
        friendshipStore.addFriend(data.friendship.friend)
        resolve(data)
      })

      socket?.once("friendRequestError", (error) => {
        console.error("Friend request error:", error)
        reject(error)
      })

      // Set a timeout in case the server doesn't respond
      setTimeout(() => {
        reject(new Error("Friend request acceptance timed out"))
      }, 5000)
    })
  }

  useEffect(() => {
    const socket = getSocket(id)

    const getRequests = async () => {
      friendshipStore.setRequests(await FriendshipService.getFriendRequests())
    }

    getRequests()

    socket?.on("friendRequest", (data) => {
      if (data.type === "RECEIVED") {
        friendshipStore.addRequest(data.request)
        notifications.show({
          title: "New Friend Request",
          message: `${data.request.sender.name} ${data.request.sender.surname} wants to be your friend`,
          color: "yellow",
        })
      }
    })

    return () => {
      socket?.off("friendRequest")
      socket?.off("friendRequestAccepted")
      socket?.off("friendRequestError")
    }
  }, [id, friendshipStore.addRequest])

  return { requests: friendshipStore.requests, acceptFriendRequest }
}

