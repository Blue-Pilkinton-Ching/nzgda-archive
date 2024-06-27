'use client'

import Link from 'next/link'
import URLName from '@/utils/client/get-url-friendly-name'

import { Game } from '../../../types'
import CardContent from './card-content'
import { getAnalytics, logEvent } from 'firebase/analytics'

export default function Card({ game }: { game: Game }) {
  function onClick() {
    logEvent(getAnalytics(), 'click_game', {
      game_name: game.name,
      isApp: game.isApp,
      studio: game.studio_id,
    })
    logEvent(getAnalytics(), `click_${game.name}`, {
      game_name: game.name,
      isApp: game.isApp,
      studio: game.studio_id,
    })
  }

  return (
    <Link
      onClick={onClick}
      key={game.id}
      href={`/game/${game.id}/${URLName(game.name)}`}
    >
      <CardContent game={game} />
    </Link>
  )
}
