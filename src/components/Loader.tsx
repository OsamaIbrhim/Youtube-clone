import { Loader2 } from 'lucide-react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-[50vh] w-full" id="loader-container">
      <Loader2 className="w-10 h-10 text-[#ffb4a7] animate-spin" id="loader-spinner" />
    </div>
  );
}
