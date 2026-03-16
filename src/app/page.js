'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

const projects = [
  {
    title: 'Music Video',
    client: 'Performance-led visual',
    category: 'Cinematography',
    type: 'project',
    links: [
      { label: 'YouTube video', url: 'https://www.youtube.com/watch?v=swZztArL0Sk', type: 'youtube-video' },
    ],
    summary: 'Moody framing, performance energy, and cut rhythm built to feel like a proper screen moment.',
    accent: '#d6a76f',
  },
  {
    title: 'Jewellery Brands',
    client: 'Luxury and fashion jewellery',
    category: 'Brand Films',
    type: 'project',
    imageUrl: '/jewlery.jpeg',
    links: [
      { label: 'Campaign hub', url: 'https://tr.ee/sKYgyGeJc5', type: 'link-hub' },
      { label: 'Hazoorilal Legacy', url: 'https://www.instagram.com/hazoorilallegacy?igsh=YmZhNTFueWM3dHV2', type: 'instagram-profile' },
      { label: 'Wear Zing', url: 'https://www.instagram.com/wear.zing?igsh=MWx3bXNqMjhyMzA0cA%3D%3D', type: 'instagram-profile' },
    ],
    summary: 'Luxury polish, fashion-led detailing, and product-first framing shaped to make jewellery feel aspirational on screen.',
    accent: '#c69255',
    imageHint: 'Add jewellery campaign still, reel cover, or product close-up',
  },
  {
    title: 'Hotel & Wedding',
    client: 'Hospitality and events',
    category: 'Event Films',
    type: 'project',
    imageUrl: 'https://images.unsplash.com/photo-1693429791869-b78ea686eed5?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=60&w=3000',
    links: [
      { label: 'Drive folder', url: 'https://drive.google.com/drive/folders/1ErEG2JRMHBbcjnlm31da1NHbvdTzYsZc', type: 'drive-folder' },
    ],
    summary: 'Atmosphere-led coverage balancing venue scale, emotion, and those cinematic in-between moments.',
    accent: '#8eb4ff',
    imageHint: 'Add venue frame, wedding still, teaser poster, or aftermovie cover',
  },
  {
    title: 'Hana Aesthetics',
    client: 'Beauty and aesthetics',
    category: 'Commercial',
    type: 'project',
    imageUrl: 'https://hanaaesthetics.com/wp-content/uploads/2024/07/HIFU-WEB-BANNER.png.png',
    links: [
      { label: 'YouTube channel', url: 'https://youtube.com/@hanaaesthetics?si=WzpU29q8ZXmCSJsv', type: 'youtube-channel' },
      { label: 'Feature video', url: 'https://youtu.be/SgexrdJKCOw?si=EmLIFOEjCm-BUDlD', type: 'youtube-video' },
    ],
    summary: 'Clean beauty imagery with soft confidence, precision close-ups, and a premium clinical finish.',
    accent: '#d8b0c8',
    imageHint: 'Add treatment room still or campaign portrait',
  },
  {
    title: 'Mother Dairy',
    client: 'FMCG brand',
    category: 'Commercial',
    type: 'project',
    imageUrl: 'https://www.motherdairy.com/images/campaign/3_ICECREAM-Adapt1170x340px---.jpg',
    imageClassName: 'grayscale brightness-110 contrast-90 saturate-0',
    links: [
      { label: 'Instagram reel 01', url: 'https://www.instagram.com/reel/DCGsbZrIp6e/?utm_source=ig_web_copy_link', type: 'instagram-reel' },
      { label: 'Instagram reel 02', url: 'https://www.instagram.com/reel/DCEeKTcy_bf/?utm_source=ig_web_copy_link', type: 'instagram-reel' },
    ],
    summary: 'Bright, accessible brand communication with clean motion language and everyday consumer clarity.',
    accent: '#7caef7',
    imageHint: 'Add reel cover, pack shot, or retail campaign still',
  },
  {
    title: 'Product Commercials',
    client: 'Reel-first product work',
    category: 'Product Visuals',
    type: 'project',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY1Olft347MyARj4Y6_3ycGnKrvStmhCWs7g&s',
    links: [
      { label: 'Instagram reel 01', url: 'https://www.instagram.com/reel/DDyy6hMhIBA/?utm_source=ig_web_copy_link', type: 'instagram-reel' },
      { label: 'Instagram reel 02', url: 'https://www.instagram.com/reel/C9Ka-GDyIV2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', type: 'instagram-reel' },
    ],
    summary: 'Bold, fast-moving product visuals built to sell texture, shape, and desirability inside short-form edits.',
    accent: '#d7c37a',
    imageHint: 'Add hero product shot, reel cover, or campaign still',
  },
];

const services = [
  {
    title: 'Cinematography',
    copy: 'Intentional lighting, framing, camera motion, and visual texture that make the brand feel bigger on screen.',
  },
  {
    title: 'Photography',
    copy: 'Production coverage that still feels authored, whether it is an event, launch, product push, or campaign day.',
  },
  {
    title: 'Video Editing',
    copy: 'Pacing, transitions, selects, sound feel, and finishing that turn raw footage into something with identity.',
  },
];

const verticals = [
  'Music videos',
  'Jewellery and fashion',
  'Hotels and weddings',
  'Beauty and aesthetics',
  'Product campaigns',
  'Food and consumer brands',
];

function getYoutubeId(url) {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

function getHostnameLabel(url) {
  if (!url || url === '#') return 'Link coming soon';

  try {
    const { hostname } = new URL(url);
    return hostname.replace('www.', '');
  } catch {
    return 'External link';
  }
}

function getPrimaryLink(project) {
  return project.links?.[0]?.url ?? '#';
}

function getLinkMeta(link) {
  switch (link.type) {
    case 'youtube-video':
      return { kicker: 'Playable on site', action: 'Watch on YouTube' };
    case 'youtube-channel':
      return { kicker: 'Channel', action: 'Open channel' };
    case 'instagram-reel':
      return { kicker: 'Instagram reel', action: 'View reel' };
    case 'instagram-profile':
      return { kicker: 'Instagram profile', action: 'Open profile' };
    case 'drive-folder':
      return { kicker: 'Google Drive', action: 'Open folder' };
    case 'link-hub':
      return { kicker: 'Link hub', action: 'Open links' };
    default:
      return { kicker: getHostnameLabel(link.url), action: 'Open link' };
  }
}

function MediaTile({ project, instagramMedia = {}, priority = false }) {
  const playableLink = project.links?.find((link) => link.type === 'youtube-video');
  const previewLink = project.links?.find((link) => instagramMedia[link.url]?.thumbnailUrl);
  const youtubeId = playableLink ? getYoutubeId(playableLink.url) : null;

  if (youtubeId) {
    return (
      <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
        <div className="aspect-video">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
            title={project.title}
            loading={priority ? 'eager' : 'lazy'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (previewLink) {
    return (
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-black/90">
        <img
          src={instagramMedia[previewLink.url].thumbnailUrl}
          alt={project.title}
          className="max-h-[24rem] w-full object-contain"
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    );
  }

  if (project.imageUrl || project.thumbnail) {
    return (
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-black/90">
        <img
          src={project.imageUrl || project.thumbnail}
          alt={project.title}
          className={`max-h-[24rem] w-full object-contain ${project.imageClassName || ''}`}
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-dashed border-white/16 bg-white/[0.03]">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(circle at top left, ${project.accent}55, transparent 45%), linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))`,
        }}
      />
      <div className="relative h-[17rem] p-6 md:h-[20rem] md:p-8 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.35em] text-white/50">
          <span>{project.category}</span>
          <span>{getHostnameLabel(getPrimaryLink(project))}</span>
        </div>
        <div>
          <div className="mb-4 h-px w-14 bg-white/15" />
          <p className="max-w-[18rem] text-sm leading-6 text-white/72">{project.imageHint}</p>
        </div>
      </div>
    </div>
  );
}

export default function VistaVisions() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [instagramMedia, setInstagramMedia] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const heroProject = useMemo(
    () => projects.find((project) => project.links?.some((link) => link.type === 'youtube-video')) ?? projects[0],
    []
  );
  const supportingProjects = useMemo(() => projects.filter((project) => project !== heroProject), [heroProject]);
  const instagramLinks = useMemo(
    () =>
      projects.flatMap((project) =>
        (project.links ?? []).filter((link) => link.type === 'instagram-reel' || link.type === 'instagram-post')
      ),
    []
  );

  useEffect(() => {
    let cancelled = false;

    async function loadInstagramMedia() {
      const results = await Promise.all(
        instagramLinks.map(async (link) => {
          try {
            const response = await fetch(`/api/instagram/oembed?url=${encodeURIComponent(link.url)}`);

            if (!response.ok) {
              return null;
            }

            const data = await response.json();
            return [link.url, data];
          } catch {
            return null;
          }
        })
      );

      if (cancelled) return;

      const nextMedia = Object.fromEntries(results.filter(Boolean));
      if (Object.keys(nextMedia).length > 0) {
        setInstagramMedia(nextMedia);
      }
    }

    if (instagramLinks.length > 0) {
      loadInstagramMedia();
    }

    return () => {
      cancelled = true;
    };
  }, [instagramLinks]);

  return (
    <main
      ref={containerRef}
      className="min-h-screen overflow-x-hidden bg-[#080808] text-white"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(520px at ${mousePosition.x}px ${mousePosition.y}px, rgba(214, 167, 111, 0.14), transparent 65%),
            radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 30%),
            linear-gradient(180deg, rgba(255,255,255,0.02), transparent 22%)
          `,
          transition: 'background 120ms ease-out',
        }}
      />

      <div className="pointer-events-none fixed inset-0 opacity-[0.08] mix-blend-screen">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '100% 100%, 120px 120px',
          }}
        />
      </div>

      <section className="relative isolate border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-sm md:px-8">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-[#d6a76f] shadow-[0_0_24px_rgba(214,167,111,0.8)]" />
            <img
              src="/vvlogo.jpeg"
              alt="Vista Vision Productions logo"
              className="h-11 w-11 rounded-full border border-white/10 object-cover shadow-[0_10px_24px_rgba(0,0,0,0.28)]"
            />
            <div className="leading-none">
              <div className="logo-font text-[1.15rem] uppercase tracking-[0.34em] text-white/88 md:text-[1.35rem]">
                Vista Vision
              </div>
              <div className="logo-font mt-1 text-[0.92rem] uppercase tracking-[0.52em] text-white/46">
                    Productions
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <a
              href="https://www.instagram.com/vistavisionproduction"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-white/64 transition hover:text-white md:inline-flex"
            >
              Instagram
            </a>
            <a
              href="mailto:vistavisionsproduction@gmail.com"
              className="rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.28em] text-white transition hover:border-white/30 hover:bg-white hover:text-black"
            >
              Start a Project
            </a>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-10 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:pb-24 lg:pt-16">
          <div className="fade-up min-w-0">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.68rem] uppercase tracking-[0.35em] text-white/60">
              <span>Photography</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>Cinematography</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>Editing</span>
            </div>

            <h1 className="display-font max-w-5xl text-[3.5rem] uppercase leading-[0.9] tracking-[0.02em] text-[#f5f1e8] md:text-[5.6rem] lg:text-[7.4rem]">
              Brand films that
              <br />
              look like cinema.
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
              Vista Visions builds screen presence for brands, launches, events, and artists through stronger framing,
              sharper edit rhythm, and visuals that feel authored instead of generic.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#work"
                className="rounded-full bg-[#f4efe6] px-6 py-3 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-black transition hover:translate-y-[-1px] hover:bg-white"
              >
                Watch the Work
              </a>
              <a
                href="https://www.instagram.com/vistavisionproduction"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/14 px-6 py-3 text-[0.78rem] uppercase tracking-[0.28em] text-white transition hover:border-white/34 hover:bg-white/8"
              >
                Visit Instagram
              </a>
            </div>
          </div>

          <div className="fade-up delay-1 min-w-0 lg:pb-3">
            <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/12 bg-[#111111] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,167,111,0.24),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_40%)]" />
              <div className="relative min-w-0 space-y-6 md:space-y-8">
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <span className="text-[0.7rem] uppercase tracking-[0.35em] text-white/45">Featured reel</span>
                  <span className="text-xs text-white/45">{heroProject.category}</span>
                </div>
                <MediaTile project={heroProject} instagramMedia={instagramMedia} priority />
                <div className="grid min-w-0 gap-4 md:grid-cols-[1fr_auto] md:items-end">
                  <div className="min-w-0">
                    <p className="text-sm uppercase tracking-[0.32em] text-[#d6a76f]">{heroProject.client}</p>
                    <h2 className="display-font mt-3 text-3xl uppercase tracking-[0.06em] text-[#f7f1e6]">
                      {heroProject.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">{heroProject.summary}</p>
                  </div>
                  <a
                    href={getPrimaryLink(heroProject)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-white/14 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.28em] text-white transition hover:border-white/30 hover:bg-white/8"
                  >
                    Open Project
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className={`fade-up delay-${index + 1} rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]`}
            >
              <div className="mb-6 h-px w-14 bg-[#d6a76f]" />
              <h3 className="display-font text-2xl uppercase tracking-[0.08em] text-[#f3eddf]">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/64">{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-14">
        <div className="fade-up flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.74rem] uppercase tracking-[0.35em] text-[#d6a76f]">Selected work</p>
            <h2 className="display-font mt-3 text-4xl uppercase tracking-[0.06em] text-[#f5f1e8] md:text-6xl">
              Built for brands
              <br />
              that need presence.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/62 md:text-base">
              The work below is a sample of projects across different styles, categories, and platforms. Reach out to see more
          </p>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {supportingProjects.map((project, index) => (
            <article
              key={project.title}
              className={`fade-up delay-${(index % 4) + 1} group overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f0f10] shadow-[0_12px_40px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-1 hover:border-white/18`}
            >
              <div className="p-4 pb-0">
                <MediaTile project={project} instagramMedia={instagramMedia} />
              </div>
              <div className="p-6 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.34em]" style={{ color: project.accent }}>
                      {project.client}
                    </p>
                    <h3 className="display-font mt-2 text-3xl uppercase tracking-[0.05em] text-[#f7f1e6]">
                      {project.title}
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.26em] text-white/52">
                    {project.category}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-white/64">{project.summary}</p>

                <div className="mt-7 space-y-3">
                  {project.links?.map((link) => {
                    const meta = getLinkMeta(link);

                    return (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-4 rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-white/22 hover:bg-white/[0.05]"
                      >
                        <div>
                          <div className="text-[0.62rem] uppercase tracking-[0.3em] text-white/40">{meta.kicker}</div>
                          <div className="mt-1 text-sm text-white/78">{link.label}</div>
                        </div>
                        <div className="rounded-full border border-white/12 px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-white/62">
                          {meta.action}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="fade-up">
            <p className="text-[0.74rem] uppercase tracking-[0.35em] text-[#d6a76f]">Visual range</p>
            <h2 className="display-font mt-3 text-4xl uppercase tracking-[0.06em] text-[#f5f1e8] md:text-5xl">
              Camera language across very different brands.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/62 md:text-base">
              The work spans artist-led visuals, luxury product storytelling, hospitality mood, commercial brand
              communication, and edit-driven social content.
            </p>
          </div>

          <div className="fade-up delay-1 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {verticals.map((item) => (
              <div
                key={item}
                className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-5 py-6 text-sm uppercase tracking-[0.24em] text-white/72"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/10 px-6 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[0.74rem] uppercase tracking-[0.35em] text-[#d6a76f]">Let&apos;s build the next film</p>
          <h2 className="display-font mt-4 text-4xl uppercase tracking-[0.05em] text-[#f7f1e6] md:text-6xl">
            If it needs screen value,
            <br />
            it should not look disposable.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/62 md:text-base">
            Bring the brief, the product, or the launch. We can shape it into a sharper visual story with production,
            cinematography, and finishing under one roof.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:vistavisionsproduction@gmail.com"
              className="rounded-full bg-[#f4efe6] px-6 py-3 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-black transition hover:bg-white"
            >
              vistavisionsproduction@gmail.com
            </a>
            <a
              href="https://www.instagram.com/vistavisionproduction"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/14 px-6 py-3 text-[0.78rem] uppercase tracking-[0.28em] text-white transition hover:border-white/30 hover:bg-white/8"
            >
              @vistavisionproduction
            </a>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&family=Oswald:wght@400;500;600;700&display=swap');

        :root {
          --font-display: 'Oswald';
          --font-body: 'Manrope';
        }

        .display-font {
          font-family: var(--font-display), sans-serif;
        }

        .logo-font {
          font-family: 'Cinzel', Georgia, serif;
          text-shadow: 0 1px 18px rgba(214, 167, 111, 0.12);
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background:
            radial-gradient(circle at top, rgba(255, 255, 255, 0.05), transparent 28%),
            linear-gradient(180deg, #090909 0%, #080808 100%);
          color: #fff;
        }

        ::selection {
          background: #f4efe6;
          color: #111;
        }

        .fade-up {
          opacity: 0;
          transform: translateY(28px);
          animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .delay-1 {
          animation-delay: 0.08s;
        }

        .delay-2 {
          animation-delay: 0.16s;
        }

        .delay-3 {
          animation-delay: 0.24s;
        }

        .delay-4 {
          animation-delay: 0.32s;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
