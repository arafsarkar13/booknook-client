export default function Loader({ label = "Loading..." }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-16"
      role="status"
    >
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="text-sm opacity-70">{label}</p>
    </div>
  );
}
