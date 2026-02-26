export default function VideoSection() {
  return (
    <section className="w-full bg-linear-to-b from-green-400/30 to-green-200/10 py-12 px-4">
      <div className="max-w-7xl md:w-[90%] mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-slate-900 mb-4">
          Voices in Motion
        </h2>
        <p className="text-md md:text-xl text-gray-500 mb-8">
          Watch the stories, ideas, and journeys of innovators shaping our
          world.
        </p>

        <div className="relative w-full h-96 md:h-125 rounded-md shadow-2xl overflow-hidden bg-slate-100">
          <video
            src="/bu_cse_video.mp4"
            controls
            loop={false}
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
