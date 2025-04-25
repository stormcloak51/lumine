export default function FriendsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="!bg-[#1f2124] w-full min-h-[80vh] shadow-lg rounded-xl border border-[rgb(66,66,66)]">
      {children}
    </div>
  )
}
