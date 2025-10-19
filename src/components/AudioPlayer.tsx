'use client';

interface AudioPlayerProps {
  audioSrc: string;
  title: string;
  isDarkMode: boolean;
}

export default function AudioPlayer(props: AudioPlayerProps) {
  void props; // Player hidden until narration files are available.
  return null;
}
