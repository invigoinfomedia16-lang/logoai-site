import Image from 'next/image'
import Badge from './ui/Badge'
import { BLOG_POSTS } from '@/data'

export default function BlogSection() {
  return (
    <section
      className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
      style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
    >
      <div className="max-w-[95%] sm:max-w-[90%] mx-auto flex flex-col items-center text-center gap-8 md:gap-[60px]">
        <div className="flex flex-col items-center gap-2.5 max-w-[700px]">
          <Badge icon="article" text="Insights" />
          <h2 className="font-bricolage font-medium text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.1em] tracking-[-0.04em] m-0">
            Tips, trends, and inspiration
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
          {BLOG_POSTS.map((post, i) => (
            <div
              key={i}
              className="bg-transparent border rounded-lg overflow-hidden flex flex-col cursor-pointer transition-transform duration-300 ease-smooth hover:-translate-y-1"
              style={{ borderColor: 'rgba(84,87,94,0.3)' }}
            >
              {/* Thumbnail */}
              <div className="relative w-full h-[220px] overflow-hidden flex-shrink-0">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <span className="font-bricolage text-[13px] font-medium text-white/70 px-2.5 py-1 rounded-md bg-white/[0.06]">
                    {post.cat}
                  </span>
                  <span className="font-bricolage text-[13px] font-medium text-white/50">
                    {post.date}
                  </span>
                </div>

                <h3 className="font-bricolage font-medium text-base md:text-lg leading-[1.3em] m-0 text-white">
                  {post.title}
                </h3>

                <p className="font-bricolage font-medium text-sm leading-[1.6em] text-white/60 m-0">
                  {post.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
